import React, { Component } from 'react';
import NodeItem from "./NodeItem";

import ContextMenu, {selectedItem} from "./contextMenu";
import DialogItem from "./DialogItem";

class RubricatorBuilder extends Component {

    constructor (props) {
           super(props);
           this.state = {
           content: [ // from DB
                     {id:-1, level: 0, clazz:"show", parentid: null, name: "Animals"},
                     {id:1, level: 1, clazz:"show", parentid: -1, name: "Cats"},
                     {id:6, level: 2, clazz:"show", parentid:1, name: "Kittens"},
                     {id: 8, level: 3, clazz:"show", parentid:6, name:"breed #1"},
                     {id:7, level: 2, clazz:"show", parentid:1, name: "Mature cats"},
                     {id:2, level: 1, clazz:"show", parentid: -1, name: "Dogs"},
                     {id:-2, level: 0, clazz:"show", parentid: null, name: "Vehicles"},
                     {id:3, level: 1, clazz:"show", parentid: -2, name: "Cars"},
                     {id: 4, level: 1, clazz:"show", parentid: -2, name: "Moto"},
                     {id: 9, level: 1, clazz:"show", parentid: -2, name: "Bicycles"},
                     {id: 5, level: 0, clazz:"show", parentid: null, name: "Real estate"}
                   ]
                }

       this.sequence = Math.max(...this.state.content.map(e => e.id));
       this.mode = null;

       this.getIndexById = (id) => this.state.content.findIndex((elem) => elem.id === id);

       this.getChildrenByIds = (id, recursive, newState) => {
            let result = [];
            let children  = newState.filter(e => e.parentid === id);
            result.push(...children);
            if (recursive) children.forEach(e=> result.push(...this.getChildrenByIds(e.id, true, newState)));
            return result;
        }

        this.recalcChildrenLevels = (id, newLevel, newState) => {
            let children  = newState.filter(e => e.parentid === id);
            children.forEach(e => {
                let level = newLevel + 1;
                newState[this.getIndexById(e.id)].level = level;
                this.recalcChildrenLevels(e.id, level, newState);
            });
        }

       this.dragAndDrop = (draggedElem, newPosition) => {

           let children = this.getChildrenByIds(draggedElem, true, this.state.content);
           let newposIsChild;

           children.forEach(e => {
             if (newPosition === e.id) {
                 newposIsChild = true;
                 return;
             }
           });
           if (draggedElem !== newPosition && !newposIsChild) {

               this.setState((prevState) => {
                   const newState = prevState.content;
                   let index = this.getIndexById(draggedElem);
                   let children = this.getChildrenByIds(draggedElem, true, newState);
                   let movingItems = newState.splice(index, 1 + children.length);
                   let newPosIndex = this.getIndexById(newPosition) + 1;
                   newState.splice(newPosIndex, 0, ...movingItems);
                   index = this.getIndexById(draggedElem);
                   newPosIndex = this.getIndexById(newPosition);
                   newState[index].parentid = newState[newPosIndex].id;
                   newState[index].level = newState[newPosIndex].level + 1 ;
                   this.recalcChildrenLevels (draggedElem, newState[index].level, newState);
                   return {content: newState}
               })
           }
       }
        this.addItem = (value) =>  {
            this.setState((prevState) => {
                const newState = prevState.content;
                if (this.mode === "Add") {
                    let selectedItemId = this.getIndexById(selectedItem);
                    let selectedItemLevel = newState[selectedItemId].level;
                    newState.splice(this.getIndexById(selectedItem) + 1, 1,
                                   {id: ++this.sequence,
                                    level: selectedItemLevel + 1,
                                    clazz: "show",
                                    parentid: selectedItem,
                                    name: value
                                   })
                }
                if (this.mode === "Rename") {
                    let currentItem = newState.find((obj) => obj.clazz === null);
                    newState.splice(this.getIndexById(selectedItem), 1,
                        {id: selectedItem,
                         level: currentItem.level,
                         clazz: "show",
                         parentid: currentItem.parentid,
                         name: value
                        })
                }
                return {content: newState}
            })
        }

        this.cancelItem = (value) => {
               this.setState((prevState) => {
                   const newState = prevState.content;
                   if (this.mode === "Add") newState.splice(this.getIndexById(selectedItem) + 1, 1);
                   if (this.mode === "Rename") {
                       let currentItem = newState.find((obj) => obj.clazz === null);
                       newState.splice(this.getIndexById(selectedItem), 1,
                           {id: selectedItem,
                            level: currentItem.level,
                            clazz: "show",
                            parentid: currentItem.parentid,
                            name: value})
                   }
                   return {conent: newState}
               })
            }
        }

   menuItems = [
        {name:"Add", action: () => {
                this.setState((prevState) => {
                    const newState = prevState.content;
                    newState.splice(this.getIndexById(selectedItem) + 1, 0,
                        {id: null, level: 0, clazz: null, parentid: null, name: null});
                    return {content: newState}
                });
                ContextMenu.setVisibility(false);
                this.mode = "Add";
            }

        },
        {name: "Remove", action: () => {
            this.setState((prevState) => {
                ContextMenu.setVisibility(false);
                const newState = prevState.content;
                let children = this.getChildrenByIds(selectedItem, true, newState);
                newState.splice(this.getIndexById(selectedItem), 1 + children.length);
                return {content: newState}
            });
        }},
        {name:"Rename", action: () => {
                ContextMenu.setVisibility(false);
                let selectedItems = this.state.content.find((obj) => obj.id === selectedItem);
                let index = this.getIndexById(selectedItem);
                this.setState((prevState) => {
                const newState = prevState.content;
                newState.splice(index, 1,
                    {id: selectedItem,
                     level: selectedItems.level,
                     clazz: null,
                     parentid: selectedItems.parentid,
                     name: selectedItems.name
                    });
                return {content: newState}
            });
            this.mode = "Rename";
        }},

       {name:"Save", action: (event) => {}}
    ];

    componentDidMount() {

    }

    handleClick = (event) =>  {
       event.preventDefault();
       const clickedNode = +event.target.getAttribute("id");
           this.setState((prevState) => {
              let currentState;
              const newState = prevState.content;

              this.getChildrenByIds(clickedNode, false, newState).forEach((e) => {
                    currentState = e.clazz; return;
              });
               this.getChildrenByIds(clickedNode, true, newState).forEach((e) => {
                   if (currentState === "show") e.clazz = "hidden";
                   if (currentState === "hidden") {
                        e.clazz = "show";
                   }
               });

              return {content: newState}
           });
    }

    render() {
        return (
            <div className="App-top" onClick={this.handleClick.bind(this)}>
                {this.state.content.map ((item,key)  =>
                    item.clazz === null ?  <DialogItem value={item.name} postCancelAction={this.cancelItem} postAddAction={this.addItem}/> :
                    <NodeItem postAction={this.dragAndDrop} dragoverAction = {this.dragover} level={item.level} key={item.id} id={item.id} clazz={item.clazz}
                                                            parentid={item.parentid} name={item.name}/>)
                }
                <ContextMenu data={this.menuItems} rootName="App-top"/>
            </div>
        );
    }
}

export default RubricatorBuilder;