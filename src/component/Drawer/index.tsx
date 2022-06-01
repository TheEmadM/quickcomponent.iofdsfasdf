import { useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { X } from 'react-feather'
import { addNodeInTree } from "../../redux/slice/app"
import elementsList from "../../data/html-elements"
import useClickoutside from "../../hooks/useClickoutside"
import useToggleDrawer from "../../hooks/useToggleDrawer"
import { RootState, HtmlElement } from "../../types"
import styled from "styled-components"
import { scrollBarStyle, Text, Title } from "../Styled"
import { genereateElement } from "../../helper"
import "./styles.sass"

const List = styled.ul`
    list-style: none;
    padding: 0;
    overflow: scroll;
    height: 100%;
    ${scrollBarStyle}
`

const Item = styled.li`
    border-bottom: 1px solid #eee;
    padding: 8px 32px;
    cursor: pointer;
    &:hover {
        background: lightblue;
    }
`
const Header = styled.div`
padding: 8px 32px;    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
`

const Drawer = () => {

    const drawerRef = useRef(null)

    const dispatch = useDispatch()
    const toggleDrawer = useToggleDrawer()
    const { visible, empty } = useSelector((state: RootState) => {
        return {
            visible: state.openDrawer,
            empty: state.emptyTree,
        }
    })

    const handleAddingChild = (name) => {
        dispatch(
            addNodeInTree({
                element: genereateElement(name, dispatch),
            })
        )
        toggleDrawer()
    }

    const dataSource = empty
        ? elementsList.filter((element) => element.tag != "text")
        : elementsList


    useClickoutside(drawerRef, () => {
        toggleDrawer()
    })

    if (visible)
        return (
            <div
                ref={drawerRef}
                style={{
                    width: "300px",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: 0,
                    background: "white",
                }}
            >
                <Header>
                    <Title.Small style={{fontWeight: '700'}}>Elements list</Title.Small>
                    <X onClick={toggleDrawer}/>
                </Header>
                <List>
                    {dataSource.map((item) => {
                        return (
                            <Item onClick={() => handleAddingChild(item.tag)}>
                                <Text>{item.tag}</Text>
                            </Item>
                        )
                    })}
                </List>
            </div>
        )
    return null
}

export default Drawer
