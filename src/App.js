import React from 'react';
import './style.css';

class Leaf extends React.Component {
    render() {
        return (
            <li
                style={{paddingLeft: 20 * this.props.lvl}}
                className={ (this.props.clickable && 'clickable') + ' lvl lvl-' + this.props.lvl}
                key={this.props.name}
                onClick={this.props.onClick || null}>
                {this.props.name}
            </li>
        )
    }
}

class Tree extends React.Component {

    render () {
        const data = this.props.data;
        const selected = this.props.selected;
        return data.map(
            item => item.children
                ? <div>
                    {this.props.children(
                        {
                            name:  item.name,
                            onClick: this.props.toggleChildren.bind(this, item.id),
                            clickable: true,
                            lvl: this.props.lvl
                        }
                    )}
                    {selected.includes(item.id) &&
                    <Tree
                        key={item.name}
                        lvl={this.props.lvl + 1}
                        toggleChildren={this.props.toggleChildren}
                        data={item.children}
                        selected={selected}
                    >
                        { this.props.children }
                    </Tree>}
                 </div>
                :
                <div>
                    {this.props.children(
                        {
                            name:  item.name,
                            lvl: this.props.lvl
                        }
                    )}
                </div>
        )
    }
};

class App extends React.Component {

    state = {
        lvlCounter: 0,
        data: [
            {id: 1, name: "Branch 1"},
            {id: 2, name: "Branch 2" , children:
                    [
                        {id:3, name: "Leaf 1"},
                        {id:4, name: "Leaf 2"}
                    ]
            },
            {id: 5, name: "Branch 3", children:
                    [
                        {id: 6, name: "Leaf 3",
                            children:
                                [
                                    {id:7, name: "Grandleaf 1"},
                                    {id:8, name: "Grandleaf 2"}
                                ]
                        }
                    ]}
        ],
        selected: []
    }

    toggleChildren = (id) => {
        let newSelected = this.state.selected;

        newSelected.includes(id)
            ? newSelected = newSelected.filter( element => element !== id)
            : newSelected = newSelected.concat(id);

        this.setState({
            selected: newSelected
        })
    }

  render() {
    return (
      <div className="App">
          <ul>
              <Tree
                  key={0}
                  lvl={this.state.lvlCounter}
                  toggleChildren={this.toggleChildren}
                  data={this.state.data}
                  selected={this.state.selected}>
                  { props => <Leaf {...props}/> }
              </Tree>
          </ul>
      </div>
    );
  }
}

export default App;
