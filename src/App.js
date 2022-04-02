import { Routes, Route, useParams } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorBox from './SingleColorBox'
import { generatePalette } from './colorHelper';

function App() {
  const FindPaletteId = () => {
    const { id, paletteId, colorId } = useParams();
    if (id) {
      const palette = seedColors.find(palette => palette.id === id)
      return <Palette palette={generatePalette(palette)} />
    } else {
      const palette = seedColors.find(palette => palette.id === paletteId)
      return <SingleColorBox palette={generatePalette(palette)} colorId={colorId} />
    }

  }

  return (
    <Routes>
      <Route path="/" element={<PaletteList palettes={seedColors} />} />
      <Route path="/palette/:id" element={<FindPaletteId />}></Route>
      <Route path="/palette/:paletteId/:colorId" element={<FindPaletteId />}></Route>
    </Routes>
  );
}

export default App;
