import { Routes, Route, useParams } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelper';
import './App.css';
import PaletteList from './PaletteList';

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
    </Routes>
  );
}

export default App;
