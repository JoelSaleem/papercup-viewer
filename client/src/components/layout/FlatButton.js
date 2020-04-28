import styled from '../../modules/styled'

const isSelectedCol = defaultCol => {
  return ({selected, theme}) => {
    return selected ? theme.ACCENT_COL : theme[defaultCol]
  }
}

export default styled.div`
  flex: 1;
  min-width: 200px;
  color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 32px;
  border-radius: 8px;
  margin: 8px;
  background: ${isSelectedCol('BRAND_COL')};
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(50,50,93,.2),
    0 1px 3px rgba(0,0,0,.2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: ${isSelectedCol('BRAND_COL_LIGHT_1')};
  }

  &:active {
    background: ${isSelectedCol('BRAND_COL_LIGHT_2')};
  }
`