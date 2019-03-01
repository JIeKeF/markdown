import React, { Component } from 'react';
import logo from '../src/image/1.png';
import marked from 'marked';
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';
import 'braft-editor/dist/index.css'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import h2m from 'h2m'
import './App.css';
import jsPDF from 'jspdf'
class App extends Component {
  constructor() {
    super()
    this.state = {
      text: "",
    }
  }
  rawMarkup = () => {
    var rawMarkup = marked(h2m(this.state.text), { sanitize: true });
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
    return { __html: rawMarkup };
  }
  handleChange = (value) => {
    this.setState({ text: value })
  }
  download=()=>{
   let doc = new jsPDF('p','pt','a4')
  //  doc.internal.scaleFactor = 1;
   let options = {
     pagesplit:true
   }
   doc.addHTML(document.getElementById('pdf'),options,function() {
    doc.save('web1111.pdf');
});
  }
  render() {
    return (
      <div className="App">
        <div className="left">
          <div className="logo"><img src={logo} /></div>
          <div>鼹鼠作品</div>
          <div className="list">
            <div className="select show">编辑</div>
            <div className="select">pdf</div>
            <div className="select" onClick={this.download}>下载</div>
            <div className="select">捐赠</div>
          </div>
        </div>
        <div className="markdown">
          <div className="center" id="pdf">
            <ReactQuill value={this.state.text} onChange={this.handleChange} />
          </div>
          <div className="right">
            <span dangerouslySetInnerHTML={this.rawMarkup()} />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
