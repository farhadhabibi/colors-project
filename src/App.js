import React, { Component, useEffect } from 'react'
import { Routes, Route, useParams, Navigate, useLocation } from 'react-router-dom';
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
    const palette = this.state.palette.find(palette => palette.id === id);
    const paletteColor = this.state.palette.find(palette => palette.id === paletteId);

    if (palette) {
      return <Palette palette={generatePalette(palette)} />
    } else if (paletteColor) {
      const checkPalette = generatePalette(paletteColor).colors;
      for (let keys in checkPalette) {
        const check = checkPalette[keys].filter(color => color.id === colorId);
        if (check.length === 0) return <Navigate to="/" replace />
      }
      return <SingleColorBox palette={generatePalette(paletteColor)} colorId={colorId} />
    } else return <Navigate to="/" replace />

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
            <Route path="/palette/:id" element={<this.findPaletteId />}></Route>
            <Route path="/palette/:paletteId/:colorId" element={<this.findPaletteId />}></Route>
            <Route path="/palette/new" element={<NewPaletteForm savePalette={this.savePalette}
              navigate={this.props.nav} palettes={this.state.palette} />}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
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
