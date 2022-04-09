import React, { Component } from 'react';
import clsx from 'clsx';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    picker: {
        width: '300px !important',
        marginTop: '1.5rem'
    },
    addColor: {
        width: '100%',
        padding: '0.6rem',
        marginTop: '0.6rem',
        fontFamily: 'normal',
        fontSize: '1.5rem',
    },
    colorNameInput: {
        width: '100%',
        marginTop: '0.6rem !important'
    }
}

class ColorPickerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorValue: "#6e4b72",
            newColorName: '',
        }
        this.updateColorValue = this.updateColorValue.bind(this);
        this.handleAddNewColor = this.handleAddNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isNameUnique", value =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule("isColorUnique", value =>
            this.props.colors.every(
                ({ color }) => color !== this.state.colorValue
            )
        );
    }

    updateColorValue(newColor) {
        this.setState({ colorValue: newColor.hex })
    }

    handleAddNewColor() {
        const newColor = { color: this.state.colorValue, name: this.state.newColorName }
        this.props.addNewColor(newColor)
        this.setState({ newColorName: "" })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { colorValue, newColorName } = this.state;
        const { paletteIsFull, classes } = this.props;

        return (
            <div>
                <ChromePicker color={colorValue}
                    onChangeComplete={this.updateColorValue}
                    className={classes.picker} />
                <ValidatorForm onSubmit={this.handleAddNewColor}>
                    <TextValidator
                        className={classes.colorNameInput}
                        label="Color Name"
                        variant="filled"
                        value={newColorName}
                        name="newColorName"
                        onChange={this.handleChange}
                        validators={['required', 'isNameUnique', 'isColorUnique']}
                        errorMessages={['Enter a color name', 'The name should be unique', 'The color is used']}
                    />
                    <Button variant="contained" color="primary"
                        className={classes.addColor}
                        style={{ backgroundColor: paletteIsFull ? 'grey' : colorValue }}
                        type="submit" disabled={paletteIsFull}>
                        {paletteIsFull ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);