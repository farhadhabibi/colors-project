import { Routes, Route, useParams } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorBox from './SingleColorBox'
import { generatePalette } from './colorHelper';
import './App.css';

function App() {
  const FindPaletteId = () => {
    const { id } = useParams();
    const palette = seedColors.find(palette => palette.id === id)
    return <Palette palette={generatePalette(palette)} />
  }
  return (
    <Routes>
      <Route path="/" element={<PaletteList palettes={seedColors} />} />
      <Route path="/palette/:id" element={<FindPaletteId />}></Route>
      <Route path="/palette/:paletteId/:colorId" element={<SingleColorBox />}></Route>
    </Routes>
  );
}

export default App;
