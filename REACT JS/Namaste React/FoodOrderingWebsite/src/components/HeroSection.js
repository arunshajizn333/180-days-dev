import {useState} from 'react';

const HeroSection = (props) => {
  const { setSearchTerm } = props;
  const [inputValue, setInputValue] = useState("");


  return (  
  <div className="hero-section">
    <p>Delicious Food, Delivered</p>
    <h1>
      Good Food <br />
      Makes a <span>Great Day</span>
    </h1>
    <h4>Discover the best restaurants near you.</h4>
    <input
      type="text"
      placeholder="Search for restaurants or dishes"
      className="search-input"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
         
          setSearchTerm(inputValue);
        }
      }}
    />
    <p>Popular searches: Pizza, Burger, Pasta</p>
  </div>
  )
};


export default HeroSection
