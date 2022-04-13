import React, { Component } from 'react'
import { Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorBox from './SingleColorBox'
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelper';
import { withMyHook } from './helper';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(localStorage.getItem('palettes'));
    this.state = {
      palette: savedPalettes || seedColors
    }
    this.deletePalette = this.deletePalette.bind(this)
  }

  findPaletteId = () => {
    const { id, paletteId, colorId } = useParams();
    if (id) {
      const palette = this.state.palette.find(palette => palette.id === id)
      return <Palette palette={generatePalette(palette)} />
    } else {
      const palette = this.state.palette.find(palette => palette.id === paletteId)
      return <SingleColorBox palette={generatePalette(palette)} colorId={colorId} />
    }

  }

  savePalette = (newPalette) => {
    this.setState({ palette: [...this.state.palette, newPalette] }, this.syncLocalStorage);
  }

  deletePalette(id) {
    this.setState(curState => ({
      palette: curState.palette.filter(palette => palette.id !== id)
    }), this.syncLocalStorage)
  }

  syncLocalStorage() {
    localStorage.setItem('palettes', JSON.stringify(this.state.palette))
  }

  render() {
    return (
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="fade" timeout={500}>
          <Routes>
            <Route path="/" element={<PaletteList palettes={this.state.palette}
              deletePalette={this.deletePalette} />} />
            <Route path="/palette/:id"
              element={<div className='page'><this.findPaletteId /></div>}></Route>
            <Route path="/palette/:paletteId/:colorId"
              element={<div className='page'><this.findPaletteId /></div>}></Route>
            <Route path="/palette/new"
              element={<div className='page'><NewPaletteForm savePalette={this.savePalette}
                navigate={this.props.nav} palettes={this.state.palette} /></div>} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

export default withMyHook(App);

// function App() {
//   const [palettes, setPalettes] = useState(seedColors);
//   let nav = useNavigate()
//   const FindPaletteId = () => {
//     const { id, paletteId, colorId } = useParams();
//     if (id) {
//       const palette = palettes.find(palette => palette.id === id)
//       return <Palette palette={generatePalette(palette)} />
//     } else {
//       const palette = palettes.find(palette => palette.id === paletteId)
//       return <SingleColorBox palette={generatePalette(palette)} colorId={colorId} />
//     }

//   }

// export default App;
