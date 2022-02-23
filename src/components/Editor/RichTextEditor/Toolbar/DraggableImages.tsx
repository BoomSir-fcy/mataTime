import React, { forwardRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AsanySortable, { SortableItemProps } from '@asany/sortable';
import { Text, Box } from 'uikit'

const defaultStyle = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  marginRight: '.5rem',
  backgroundColor: 'white',
  width: '105px',
  height: '105px',
};

const SortItem = forwardRef((props: SortableItemProps<any>, ref: any) => {
  const { data, style, drag, className, animated } = props;
  return (
    <li
      className={className}
      style={{ ...defaultStyle, ...style }}
      ref={drag(ref)}
    >
      <Text color='red'>{data.id}: {data.name}</Text>
    </li>
  );
});

const DraggableImages = (args) => {
  const [items, setItems] = useState([
    { id: '1', name: '小明', type: 'sortable-card' },
    { id: '2', name: '陈二', type: 'sortable-card' },
    { id: '3', name: '张三', type: 'sortable-card' },
    { id: '4', name: '李四', type: 'sortable-card' },
    { id: '5', name: '老五', type: 'sortable-card' },
    { id: '6', name: '赵六', type: 'sortable-card' },
    { id: '7', name: '王七', type: 'sortable-card' },
  ]);

  const handleChange = (data, event) => {
    // args.onChange(data, event);
    setItems(prev => {
      return data.filter(item => item.id !== event.item.id)
    });
    console.log(data, event)
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AsanySortable
        accept={['sortable-card']}
        tag="ul"
        style={{ listStyle: 'none', padding: 0 }}
        items={items}
        layout='grid'
        onChange={handleChange}
        itemRender={SortItem}
      />
    </DndProvider>
  );
};

export default DraggableImages
