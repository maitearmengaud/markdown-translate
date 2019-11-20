import React, { Component, Fragment } from 'react'
import { Container, Row, Col, FormControl} from 'react-bootstrap'
import './App.css'
import { sampleText } from './sampleText'
import marked from 'marked'

class App extends Component {
  state = {
    text: sampleText
  }

    //getItem récupère ce qui est stocké dans localStorage
    // je recharge le texte si il n'y a pas de texte

  componentDidMount () {
    const text = localStorage.getItem('text')
    if (text) {
      this.setState({ text })
    } else {
      this.setState({ text: sampleText })
    }
  }
  // appelée immédiatement après que la mise à jour a eu lieu.
  //setItem permet d'enregistrer une donnée, il prend deux paramètres: le nom du paramètre et sa valeur
  componentDidUpdate () {
    const { text } = this.state
    localStorage.setItem('text', text)
  }

  // event au moment ou quelquechose change dans le textarea, notre target c'est le textarea
  // on récupère la valeur du state text et/ou la valeur qui est à l'intèrieur du textarea
  // on récupère la nouvelle valeur et on la met à jour, ici text
  handleChange = event => { 
    const text = event.target.value
    this.setState({ text })
  }

  // premier paramètre texte que l'on veut modifier et en second des options comme sanitize empêche l'utilisateur d'écrire du code
  renderText = text => {
    const __html =  marked(text, { sanitize: true })
    return { __html }
  }

  render() {
    return (
      <Fragment>
        <Container>
          <h1>Markdown translate</h1>
          <Row>
            <Col sm className="block">
              <h2 className="subtitle">Markdown</h2>
              <FormControl 
                as='textarea'
                value={this.state.text}
                // l'événement onChange se produit lorsque la valeur d'un élément est modifiée
                onChange={this.handleChange} 
              >
              </FormControl>
            </Col>
            <Col sm className="block">
              <h2 className="subtitle">Preview</h2>
              {/* //dangerouslySetInnerHTML prend en valeur des données créer par l'utilisateur du site */}
              <div style={{padding:"10px 20px"}}dangerouslySetInnerHTML={this.renderText(this.state.text)} />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default App;
