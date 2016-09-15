import { ContextMenu, Item, Separator } from 'react-contexify';

function onClick(item, target) {
  // item is the item component on which you clicked. You can access all the props
  console.log(item);
  // target refer to the html node on which the menu is triggered
  console.log(target);
}

export const menuId = 'menu_id';

export default (props) => {
  return (
    <ContextMenu id={menuId} {...props}>
      <Item label="Add" icon="fa fa-plus" onClick={onClick} />
      <Item label="Remove" icon="fa fa-trash" onClick={onClick} />
      <Separator/>
      <Item label="Paste" icon="fa fa-clipboard" disabled />
    </ContextMenu>
  );
};