class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    numChildren: 0
  }
  }

  render () {
    const children = [];
    return (
      <ParentComponent addChild={this.onAddChild}>
        {children}
      </ParentComponent>
    );
  }

  onAddChild = () => {
    this.setState({
      numChildren: this.state.numChildren + 1
    });
  }
}

const ParentComponent = props => (
  <div className="card calculator">
    <p><a href="#" onClick={props.addChild}>Add Another Child Component</a></p>
    <div id="children-pane">
      {props.children}
    </div>
  </div>
);

const ChildComponent = props => <div>{"I am child " + this.props.number}</div>;