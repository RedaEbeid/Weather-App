import './App.css' // CSS FILE
// MATERIAL UI
import { createTheme,ThemeProvider } from "@mui/material/styles"; // THEME
import Container from "@mui/material/Container"; // CONTAINER
import Typography from "@mui/material/Typography"; // TYPOGRAPHY
import CloudIcon from "@mui/icons-material/Cloud"; // CLOUD ICON
import Button from "@mui/material/Button"; // CLOUD ICON
// REACT
import { useEffect, useState } from 'react';
// I18NEXT
import { useTranslation } from "react-i18next";
// AXIOS LIBRARY
import axios from 'axios';
// MOMENT LIBRARY
import moment from "moment";
import 'moment/min/locales';
moment.locale('ar');


const theme = createTheme({
  typography: {  fontFamily: ["Ibm"]  }
});

let cancelAxios = null;

function App () {
  // STATES
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState('');
  const [temp, setTemp] = useState( {temperature: null, description: '', icon: '', max: null, min: null} );
  const[locale, setLocale] = useState('ar');

  // EVENT HANDLERS
  function handleLangaugeClick () {
    if (locale === "en") {
      setLocale('ar');
      i18n.changeLanguage('ar');
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage('en');
      moment.locale('en');
    };
  
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  };

  useEffect(() => {
    i18n.changeLanguage(locale);
    setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=d08e579acfc36185d10a445ff58e0ab9',
    {cancelToken: new axios.CancelToken( (c)=> cancelAxios = c )})
      .then(function (response) {
        // handle success
        let responseTemp = Math.round(response.data.main.temp - 272.15);
        let min = Math.round(response.data.main.temp_min - 272.15);
        let max = Math.round(response.data.main.temp_max - 272.15);
        let description = response.data.weather[0].description;;
        let icon = response.data.weather[0].icon;
        setTemp({
          temperature: responseTemp,
          description: description,
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          min: min,
          max: max,
        });
        console.log(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    
    return () => {
      console.log('Canceling');
      cancelAxios()
    };
  }, []);

  return (
    <div className="App"  dir={locale ==='en' ? 'ltr' : 'rtl'}>
      <ThemeProvider theme={theme}>
        {/* CONTAINER */}
        <Container maxWidth="sm" style={{ height: '100vh',display: 'flex',justifyContent: 'center',alignItems: 'center', flexDirection:'column'}}>
          
            
          {/* CARD */}
          <div style={{width:'100%',background:'rgb(28 52 91 / 36%)', color:'#fff', padding:'10px', borderRadius:'15px', boxShadow:'0 11px 1px rgba(0,0,0,0.05)'}}>

            {/* CONTENT */}
            <div>

              {/* CITY & TIME */}
              <div style={{display:'flex', justifyContent:'start', alignItems:'center'}}>
                <Typography variant="h2" gutterBottom style={{fontWeight:'600'}}> {t('cairo')} </Typography>
                <Typography variant="h5" gutterBottom style={{margin:'0 20px'}}> {dateAndTime} </Typography>
              </div>
              {/* === CITY & TIME === */}

              <hr />
              {/* CONTAINER OF DEGREE + CLOUD ICON */}
              <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                {/* DEGREE & DESCRIBTION */}
                <div>
                  {/* TEMP */}
                  <div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <Typography variant="h1" gutterBottom style={{ textAlign: 'right' }}> {temp.temperature} </Typography>
                      <img src={temp.icon} />
                    </div>
                    <Typography variant="h6" gutterBottom>  {t(temp.description)}  </Typography>
                      
                      {/* MIN & MAX TEMP */}
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <h5>{t('Min')}: {temp.min}</h5>
                      <h5 style={{margin:'0 15px'}}>|</h5>
                      <h5>{t('Max')}: {temp.max}</h5>
                    </div>
                  </div>
                   {/* === MIN & MAX TEMP === */}
                </div>
                {/* === DEGREE & DESCRIBTION === */}

                <CloudIcon style={{fontSize:'200px', color:'#fff'}}/>
              </div>
              {/* === CONTAINER OF DEGREE + CLOUD ICON === */}
              
            </div>
            {/* === CONTENT === */}

          </div>
          {/* === CARD === */}
          {/* BUTTON LANGUEGE */}
          <div style={{width:'100%', marginTop:'20px', display:'flex', justifyContent:'end', alignItems:'center'}}>
            <Button onClick={handleLangaugeClick} style={{color:'#fff'}} variant="text"> {locale==='en' ? 'Arabic': 'إنجليزي'} </Button>
          </div>
          {/* === BUTTON LANGUEGE === */}
        </Container>
       {/* === CONTAINER === */}

      </ThemeProvider>
    </div>
  );
}
export default App;