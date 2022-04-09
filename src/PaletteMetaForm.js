import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 'form',
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.createPalette = this.createPalette.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLocaleLowerCase() !== value.toLocaleLowerCase()
            )
        );
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    showEmojiPicker() {
        this.setState({ stage: 'emoji' })
    }

    createPalette(emoji) {
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        }
        this.props.saveNewPalette(newPalette)
    }

    render() {
        const { open, newPaletteName } = this.state;
        const { saveNewPalette, hideForm } = this.props;

        return (
            <div>
                <Dialog open={this.state.stage === 'emoji'} onClose={hideForm}>
                    <DialogTitle>
                        Choose a palette emoji
                    </DialogTitle>
                    <Picker title="Pick your palette emoji" onSelect={this.createPalette} />
                </Dialog>
                    <Dialog open={this.state.stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create A Palette Name</DialogTitle>
                        <ValidatorForm onSubmit={this.showEmojiPicker}>
                            <DialogContent>
                                <DialogContentText>
                                    Please enter a palette name, the palette name should be unique!
                            </DialogContentText>
                                <TextValidator value={newPaletteName}
                                    label='Palette Name'
                                    fullWidth
                                    margin='normal'
                                    name="newPaletteName"
                                    onChange={this.handleChange}
                                    validators={['required', 'isPaletteNameUnique']}
                                    errorMessages={['Enter Palette Name', 'Palette Name is taken']}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={hideForm} color="primary">
                                    Cancel
                            </Button>
                                <Button variant="contained" color="primary" type="submit">
                                    Create Palette
                            </Button>
                            </DialogActions>
                        </ValidatorForm >
                    </Dialog >
            </div >
                );
            }
        }
        
export default PaletteMetaForm;