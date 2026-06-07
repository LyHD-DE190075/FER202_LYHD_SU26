import './MyCSS.css';
function Hello() {
    /*
    const helloStyle = {
    fontSize: '36px',       
    color: 'black',       
    fontWeight: 'normal'
  };
    const reactStyle = {
        fontSize: 48,
        color: 'blue',
        fontWeight: 'bold'
    };
    */
  return (
    <div>
        {/*
        Sử dụng trực tiếp giá trị style trong JSX 
        */}
      <p className='hello'>Hello 
        <span className='react'>React</span></p>
    </div>
  );
}

export default Hello;
