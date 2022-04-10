import React, { Component } from 'react'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorBox from './SingleColorBox'
import { generatePalette } from './colorHelper';
import NewPaletteForm from './NewPaletteForm';
import { withMyHook } from './helper'

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
      <Routes>
        <Route path="/" element={<PaletteList palettes={this.state.palette} deletePalette={this.deletePalette} />} />
        <Route path="/palette/:id" element={<this.findPaletteId />}></Route>
        <Route path="/palette/:paletteId/:colorId" element={<this.findPaletteId />}></Route>
        <Route path="/palette/new" element={<NewPaletteForm savePalette={this.savePalette}
          navigate={this.props.nav} palettes={this.state.palette} />} />
      </Routes>
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

  // function SavePalette(newPalette) {
  //   // useEffect(() => {
  //   //   setPalettes(newPalette);    STACKED IN HERE
  //   // }, []);
  //   console.log(newPalette)
  //   return <NewPaletteForm savePalette={SavePalette} navigate={nav} />
  // }

//   return (
//     <Routes>
//       <Route path="/" element={<PaletteList palettes={palettes} />} />
//       <Route path="/palette/:id" element={<FindPaletteId />}></Route>
//       <Route path="/palette/:paletteId/:colorId" element={<FindPaletteId />}></Route>
//       <Route path="/palette/new" element={<SavePalette />} />
//     </Routes>
//   );
// }

// export default App;
