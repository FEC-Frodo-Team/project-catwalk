export const styles = {
  qAContainer: {
    margin: 'auto',
    width: '75%',
    padding: '10px',
    borderTop: '2px solid black',
    borderBottom: '2px solid black',
  },

  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  searchBar: {
    width: '100%',
    background: '#F2F1F9',
    border: '1px solid black',
    borderRight: 'none',
    padding: '0.5rem',
  },

  searchBtn: {
    padding: '13px',
    background: '#F2F1F9',
    border: '1px solid black',
    borderLeft: 'none',
    cursor: 'pointer',
  },

  questionAndAnswers: {
    padding: '2rem',
    margin: '2rem',
    height: '300px',
    overflowY: 'scroll',
  },

  questionBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  answerBox: {
    display: 'flex',
    flexDirection: 'column',
  },

  answerBoxP: {
    marginBottom: '0.2rem',
  },

  moreLessAnswers: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
  },

  answerPhotos: {
    display: 'flex',
    flexDirection: 'row',
  },

  pic: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '5px',
    width: '5rem',
    height: '5rem',
    margin: '5px',
  },

  helpfulAndReport: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    fontSize: '0.8rem',
  },

  buttons: {
    width: 'auto',
    height: '3rem',
    background: 'transparent',
    marginRight: '.5rem',
  },

  enlargePic: {
    overflow: 'auto',
    border: '2px solid blue',
    position: 'absolute',
    width: 'auto',
    height: '400px',
    top: '60%',
  },

  forms: {
    overflowY: 'scroll',
    border: '2px solid blue',
    position: 'absolute',
    backgroundColor: 'white',
    width: '700px',
    height: '550px',
    top: '50%'},

  popupBox: {
    position: 'fixed',
    background: '#00000050',
    width: '100%',
    height: '100vh',
    top: '0',
    left: '0',
    zIndex: '900',
  },

  box: {
    position: 'relative',
    width: '70%',
    margin: '0 auto',
    height: 'auto',
    maxHeight: '70vh',
    marginTop: 'calc(100vh - 85vh - 20px)',
    background: '#fff',
    borderRadius: '4px',
    padding: '20px',
    border: '1px solid #999',
    overflow: 'auto',
    // zIndex: '1000',
  },

  closeIcon: {
    content: '\'x\'',
    cursor: 'pointer',
    position: 'fixed',
    right: 'calc(15% - 30px)',
    top: 'calc(100vh - 85vh - 33px)',
    background: '#ededed',
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    lineHeight: '20px',
    textAlign: 'center',
    border: '1px solid #999',
    fontSize: '20px',
  },

  formInputs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '75%',
  },

  formBody: {
    height: '5rem',
    width: 'auto',
  },
};
