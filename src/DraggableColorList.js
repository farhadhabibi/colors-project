import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(({ colors, deleteColorBox }) => {
    return (
        <div style={{ height: '100%' }}>
            {
                colors.map((colors, i) => (
                    <DraggableColorBox
                        color={colors.color}
                        index={i}
                        name={colors.name} key={colors.name}
                        deleteColorBox={deleteColorBox}
                    />
                ))
            }
        </div>
    );
})

export default DraggableColorList;