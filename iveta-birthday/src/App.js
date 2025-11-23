import { useState, useEffect, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const MaldivesSurprise = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const successMessageRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const departureDate = new Date('2026-03-04T16:00:00');
      const now = new Date();
      const difference = departureDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll to success message when guessed correctly
  useEffect(() => {
    if (guessedCorrectly && successMessageRef.current) {
      successMessageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [guessedCorrectly]);

  // Resort images from pics folder
  const resortImages = [
    `${process.env.PUBLIC_URL}/pics/364904860.jpg`,
    `${process.env.PUBLIC_URL}/pics/367051522.jpg`,
    `${process.env.PUBLIC_URL}/pics/364904908.jpg`,
    `${process.env.PUBLIC_URL}/pics/327158367.jpg`,
    `${process.env.PUBLIC_URL}/pics/327199365.jpg`,
    `${process.env.PUBLIC_URL}/pics/367051524.jpg`,
    `${process.env.PUBLIC_URL}/pics/364904892.jpg`,
    `${process.env.PUBLIC_URL}/pics/364904914.jpg`,
    `${process.env.PUBLIC_URL}/pics/ocean-202074_1920.jpg`,
    `${process.env.PUBLIC_URL}/pics/fish-2733323_1920.jpg`,
    `${process.env.PUBLIC_URL}/pics/maldives-2299563_1920.jpg`,
    `${process.env.PUBLIC_URL}/pics/the-sea-3198131_1920.jpg`,
    `${process.env.PUBLIC_URL}/pics/maldive-islands-2171627_1920.jpg`,
    `${process.env.PUBLIC_URL}/pics/sea-2379496_1920.jpg`
  ];

  const handleGuess = () => {
    const guess = userGuess.toLowerCase().trim();
    const correctAnswers = ['малдиви', 'малдивите', 'maldives', 'малдивски острови'];

    if (correctAnswers.includes(guess)) {
      setGuessedCorrectly(true);
    } else {
      setAttempts(attempts + 1);
      setUserGuess('');
      if (attempts >= 2) {
        setShowHint(true);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  // If not guessed correctly, show the guessing game
  if (!guessedCorrectly) {
    return (
      <div style={{
        fontFamily: "'Open Sans', sans-serif",
        lineHeight: 1.6,
        color: '#333',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            padding: '40px 30px',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.5em',
              marginBottom: '10px'
            }}>
              🎉 Честит 30-ти Рожден Ден, Ивета! 🎉
            </h1>
            <div style={{ fontSize: '1.2em', opacity: 0.9 }}>
              Готова ли си за твоята награда?
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '40px 30px' }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '30px'
            }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                color: '#2c3e50',
                fontSize: '1.8em',
                marginBottom: '20px'
              }}>
                🔍 Разгадай дестинацията!
              </h2>
              <p style={{ fontSize: '1.1em', color: '#7f8c8d', marginBottom: '30px' }}>
                Разгледай снимките и познай къде ще отидеш...
              </p>
            </div>

            {/* Carousel */}
            <div style={{ marginBottom: '30px' }}>
              <Carousel
                interval={3000}
                pause="hover"
                activeIndex={currentImageIndex}
                onSelect={(selectedIndex) => setCurrentImageIndex(selectedIndex)}
                style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
              >
                {resortImages.map((img, index) => (
                  <Carousel.Item key={index}>
                    <div style={{ height: '500px', position: 'relative' }}>
                      <img
                        className="d-block w-100 h-100"
                        src={img}
                        alt={`Destination hint ${index + 1}`}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <Carousel.Caption style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '10px', padding: '10px' }}>
                      <h5 style={{ color: 'white', fontWeight: 'bold', marginBottom: 0 }}>
                        Снимка {index + 1} от {resortImages.length}
                      </h5>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            {/* Guess Input */}
            <div style={{
              background: '#f8f9fa',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <h3 style={{
                color: '#2c3e50',
                marginBottom: '20px',
                fontSize: '1.3em'
              }}>
                Къде ще отидеш?
              </h3>

              {attempts > 0 && attempts < 3 && (
                <div style={{
                  background: '#fff3cd',
                  color: '#856404',
                  padding: '15px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  border: '1px solid #ffeaa7'
                }}>
                  Опитай отново! {attempts} {attempts === 1 ? 'опит' : 'опита'}
                </div>
              )}

              {showHint && (
                <div style={{
                  background: '#d1ecf1',
                  color: '#0c5460',
                  padding: '15px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  border: '1px solid #bee5eb'
                }}>
                  💡 Подсказка: Тропически острови в Индийския океан, известни с кристално чисти води...
                </div>
              )}

              <div style={{
                display: 'flex',
                gap: '10px',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                <input
                  type="text"
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Въведи дестинацията..."
                  style={{
                    flex: 1,
                    padding: '15px 20px',
                    fontSize: '1.1em',
                    border: '2px solid #4facfe',
                    borderRadius: '25px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleGuess}
                  style={{
                    background: '#4facfe',
                    color: 'white',
                    border: 'none',
                    padding: '15px 40px',
                    borderRadius: '25px',
                    fontSize: '1.1em',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#00f2fe';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#4facfe';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Проверка
                </button>
              </div>

              <p style={{
                marginTop: '20px',
                fontSize: '0.9em',
                color: '#7f8c8d'
              }}>
                💡 Можеш да пишеш на български или английски
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Once guessed correctly, show the full reveal
  return (
    <div style={{
      fontFamily: "'Open Sans', sans-serif",
      lineHeight: 1.6,
      color: '#333',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
          padding: '40px 30px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5em',
            marginBottom: '10px',
            position: 'relative',
            zIndex: 1
          }}>
            🌴 Семейно приключение 🌴
          </h1>
          <div style={{
            fontSize: '1.2em',
            opacity: 0.9,
            position: 'relative',
            zIndex: 1
          }}>
            Незабравимо семейно пътуване за Ивета Викторова
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 'clamp(15px, 4vw, 40px) clamp(15px, 3vw, 30px)' }}>

          {/* Success Message */}
          <div ref={successMessageRef} style={{
            background: 'linear-gradient(135deg, #a8e6cf 0%, #7fcdcd 100%)',
            color: '#2c3e50',
            padding: 'clamp(15px, 4vw, 30px)',
            borderRadius: '15px',
            textAlign: 'center',
            marginBottom: 'clamp(20px, 5vw, 40px)',
            border: '3px solid #4facfe'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.3em, 5vw, 2em)',
              marginBottom: '12px',
              fontFamily: "'Playfair Display', serif"
            }}>
              🎊 БРАВО! Позна правилно! 🎊
            </h2>
            <p style={{ fontSize: 'clamp(0.95em, 3vw, 1.2em)', lineHeight: 1.8 }}>
              Да, отиваш в <strong>МАЛДИВИТЕ</strong>! 🏝️<br/>
              Разгледай всички детайли за твоето невероятно приключение по-долу...
            </p>
          </div>

          {/* Flight Details */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              color: '#2c3e50',
              fontSize: 'clamp(1.2em, 4vw, 1.8em)',
              marginBottom: '15px',
              borderBottom: '3px solid #4facfe',
              paddingBottom: '8px'
            }}>
              ✈️ Детайли за полетите
            </h2>

            <div className="flight-container" style={{
              background: '#f8f9fa',
              padding: '15px',
              borderRadius: '15px',
              borderLeft: '5px solid #4facfe'
            }}>
              {/* Outbound Flight */}
              <div style={{
                marginBottom: '20px',
                padding: '12px',
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  <span style={{ fontWeight: 600, color: '#2c3e50', fontSize: 'clamp(0.9em, 2.5vw, 1.1em)' }}>
                    Полет 1 - Отиване
                  </span>
                  <span style={{ color: '#7f8c8d', fontSize: 'clamp(0.75em, 2vw, 0.9em)' }}>
                    Сряда, 4 март 2026
                  </span>
                </div>

                {/* First Leg: SOF to IST */}
                <div style={{
                  marginBottom: '15px',
                  padding: '10px',
                  background: '#f8f9fa',
                  borderRadius: '10px'
                }}>
                  <div className="flight-info-row" style={{ marginBottom: '10px' }}>
                    <span style={{
                      background: '#C70025',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.85em',
                      fontWeight: 'bold'
                    }}>
                      TK1032
                    </span>
                    <span style={{ color: '#7f8c8d' }}>Turkish Airlines</span>
                    <span style={{ color: '#7f8c8d' }}>• Economy Class</span>
                  </div>

                  <div className="flight-route" style={{ margin: '10px 0' }}>
                    <div className="flight-location">
                      <div className="flight-time" style={{ color: '#2c3e50' }}>16:00</div>
                      <div className="flight-city" style={{ color: '#7f8c8d' }}>София (SOF)</div>
                    </div>
                    <div className="flight-duration">
                      <div style={{ fontSize: '0.8em', color: '#7f8c8d' }}>1ч 30м</div>
                      <div style={{ fontSize: '1.5em', color: '#4facfe' }}>→</div>
                    </div>
                    <div className="flight-location" style={{ textAlign: 'right' }}>
                      <div className="flight-time" style={{ color: '#2c3e50' }}>18:30</div>
                      <div className="flight-city" style={{ color: '#7f8c8d' }}>Истанбул (IST)</div>
                    </div>
                  </div>
                </div>

                {/* Transfer */}
                <div style={{
                  padding: '8px 12px',
                  background: '#fff3cd',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  textAlign: 'center',
                  fontSize: 'clamp(0.75em, 2vw, 0.9em)',
                  color: '#856404'
                }}>
                  ⏱ Трансфер в Истанбул: 8ч 5м
                </div>

                {/* Second Leg: IST to MLE */}
                <div style={{
                  padding: '10px',
                  background: '#f8f9fa',
                  borderRadius: '10px'
                }}>
                  <div className="flight-info-row" style={{ marginBottom: '10px' }}>
                    <span style={{
                      background: '#C70025',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.85em',
                      fontWeight: 'bold'
                    }}>
                      TK734
                    </span>
                    <span style={{ color: '#7f8c8d' }}>Turkish Airlines</span>
                    <span style={{ color: '#7f8c8d' }}>• Economy Class</span>
                  </div>

                  <div className="flight-route" style={{ margin: '10px 0' }}>
                    <div className="flight-location">
                      <div className="flight-time" style={{ color: '#2c3e50' }}>02:35</div>
                      <div className="flight-city" style={{ color: '#7f8c8d' }}>Истанбул (IST)</div>
                      <div className="flight-date" style={{ color: '#e74c3c', fontWeight: 600 }}>Четвъртък, 5 март</div>
                    </div>
                    <div className="flight-duration">
                      <div style={{ fontSize: '0.8em', color: '#7f8c8d' }}>8ч</div>
                      <div style={{ fontSize: '1.5em', color: '#4facfe' }}>→</div>
                    </div>
                    <div className="flight-location" style={{ textAlign: 'right' }}>
                      <div className="flight-time" style={{ color: '#2c3e50' }}>12:35</div>
                      <div className="flight-city" style={{ color: '#7f8c8d' }}>Малдиви (MLE)</div>
                      <div className="flight-date" style={{ color: '#e74c3c', fontWeight: 600 }}>Четвъртък, 5 март</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Return Flight */}
              <div style={{
                padding: '12px',
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  <span style={{ fontWeight: 600, color: '#2c3e50', fontSize: 'clamp(0.9em, 2.5vw, 1.1em)' }}>
                    Полет 2 - Завръщане
                  </span>
                  <span style={{ color: '#7f8c8d', fontSize: 'clamp(0.75em, 2vw, 0.9em)' }}>
                    Четвъртък, 12 март 2026
                  </span>
                </div>

                {/* First Leg: MLE to IST */}
                <div style={{
                  marginBottom: '15px',
                  padding: '10px',
                  background: '#f8f9fa',
                  borderRadius: '10px'
                }}>
                  <div className="flight-info-row" style={{ marginBottom: '10px' }}>
                    <span style={{
                      background: '#C70025',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.85em',
                      fontWeight: 'bold'
                    }}>
                      TK735
                    </span>
                    <span style={{ color: '#7f8c8d' }}>Turkish Airlines</span>
                    <span style={{ color: '#7f8c8d' }}>• Economy Class</span>
                  </div>

                  <div className="flight-route" style={{ margin: '10px 0' }}>
                    <div className="flight-location">
                      <div className="flight-time" style={{ color: '#2c3e50' }}>21:55</div>
                      <div className="flight-city" style={{ color: '#7f8c8d' }}>Малдиви (MLE)</div>
                      <div className="flight-date" style={{ color: '#7f8c8d' }}>Четвъртък, 12 март</div>
                    </div>
                    <div className="flight-duration">
                      <div style={{ fontSize: '0.8em', color: '#7f8c8d' }}>8ч 45м</div>
                      <div style={{ fontSize: '1.5em', color: '#4facfe' }}>→</div>
                    </div>
                    <div className="flight-location" style={{ textAlign: 'right' }}>
                      <div className="flight-time" style={{ color: '#2c3e50' }}>04:40</div>
                      <div className="flight-city" style={{ color: '#7f8c8d' }}>Истанбул (IST)</div>
                      <div className="flight-date" style={{ color: '#e74c3c', fontWeight: 600 }}>Петък, 13 март</div>
                    </div>
                  </div>
                </div>

                {/* Transfer */}
                <div style={{
                  padding: '8px 12px',
                  background: '#fff3cd',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  textAlign: 'center',
                  fontSize: 'clamp(0.75em, 2vw, 0.9em)',
                  color: '#856404'
                }}>
                  ⏱ Трансфер в Истанбул: 3ч 50м
                </div>

                {/* Second Leg: IST to SOF */}
                <div style={{
                  padding: '10px',
                  background: '#f8f9fa',
                  borderRadius: '10px'
                }}>
                  <div className="flight-info-row" style={{ marginBottom: '10px' }}>
                    <span style={{
                      background: '#C70025',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.85em',
                      fontWeight: 'bold'
                    }}>
                      TK1027
                    </span>
                    <span style={{ color: '#7f8c8d' }}>Turkish Airlines</span>
                    <span style={{ color: '#7f8c8d' }}>• Economy Class</span>
                  </div>

                  <div className="flight-route" style={{ margin: '10px 0' }}>
                    <div className="flight-location">
                      <div className="flight-time" style={{ color: '#2c3e50' }}>08:30</div>
                      <div className="flight-city" style={{ color: '#7f8c8d' }}>Истанбул (IST)</div>
                      <div className="flight-date" style={{ color: '#e74c3c', fontWeight: 600 }}>Петък, 13 март</div>
                    </div>
                    <div className="flight-duration">
                      <div style={{ fontSize: '0.8em', color: '#7f8c8d' }}>1ч 15м</div>
                      <div style={{ fontSize: '1.5em', color: '#4facfe' }}>→</div>
                    </div>
                    <div className="flight-location" style={{ textAlign: 'right' }}>
                      <div className="flight-time" style={{ color: '#2c3e50' }}>08:45</div>
                      <div className="flight-city" style={{ color: '#7f8c8d' }}>София (SOF)</div>
                      <div className="flight-date" style={{ color: '#e74c3c', fontWeight: 600 }}>Петък, 13 март</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resort Info */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              color: '#2c3e50',
              fontSize: '1.8em',
              marginBottom: '20px',
              borderBottom: '3px solid #4facfe',
              paddingBottom: '10px'
            }}>
              🏝️ Информация за хотела
            </h2>

            <div style={{
              background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2em',
                marginBottom: '15px'
              }}>
                Oblu Xperience Ailafushi
              </div>

              <div style={{
                fontSize: '1.1em',
                lineHeight: 1.8,
                marginBottom: '20px'
              }}>
                Изживейте най-високото луксозно обслужване в сърцето на Малдивите в Oblu Xperience Ailafushi.
                Този зашеметяващ курорт предлага девствени плажове, кристално чисти води и световно класни удобства,
                които ще направят престоя ви незабравим.
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginTop: '25px'
              }}>
                {[
                  { icon: '🏖️', text: 'Достъп до частен плаж' },
                  { icon: '🏊‍♀️', text: 'Безкраен басейн' },
                  { icon: '🍽️', text: 'Висококачествено хранене' },
                  { icon: '🧘‍♀️', text: 'Спа и уелнес' },
                  { icon: '🤿', text: 'Водни спортове' },
                  { icon: '🌅', text: 'Изглед към залеза' }
                ].map((feature, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      padding: '15px',
                      borderRadius: '10px',
                      textAlign: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ fontSize: '2em', marginBottom: '10px' }}>{feature.icon}</div>
                    <div>{feature.text}</div>
                  </div>
                ))}
              </div>

              {/* Hotel Website Link */}
              <div style={{ marginTop: '30px' }}>
                <a
                  href="https://www.coloursofoblu.com/oblu-xperience-ailafushi"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    background: 'white',
                    color: '#0984e3',
                    padding: '15px 35px',
                    borderRadius: '25px',
                    fontSize: '1.1em',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
                  }}
                >
                  🌐 Виж уебсайта на хотела
                </a>
              </div>
            </div>
          </div>

          {/* Birthday Message */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              color: '#2c3e50',
              fontSize: '1.8em',
              marginBottom: '20px',
              borderBottom: '3px solid #4facfe',
              paddingBottom: '10px'
            }}>
              🎂 Семейно послание за 30-ия рожден ден
            </h2>

            <div style={{
              background: 'linear-gradient(135deg, #a8e6cf 0%, #7fcdcd 100%)',
              color: '#2c3e50',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',
              fontSize: '1.1em',
              lineHeight: 1.8
            }}>
              "Скъпо Ико,<br/><br/>
              Това пътуване до Малдивите е твоя мечта, която ще се сбъдне за твоя 30-и рожден ден!
              Няма по-добър начин да отпразнуваме този важен юбилей от едно невероятно приключение в рая заедно с цялото семейство.<br/><br/>
              Ще вървим по красивите плажове, ще се наслаждаваме на кристално чистите води и ще създаваме
              незабравими спомени, които ще траят цял живот. Нямаме търпение да видим
              невероятния морски живот и да се забавляваме в този магически курорт заедно!<br/><br/>
              Това е твоят ден, твоята мечта, твоето приключение! Нека направим твоя 30-и рожден ден
              най-незабравимия ден в живота ти!<br/><br/>
              С любов,<br/>
              Mама, тати, вуйчо и Стоян👨‍👩‍👧‍👦🎂"
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          background: '#2c3e50',
          color: 'white',
          padding: '30px',
          textAlign: 'center'
        }}>
          <p style={{ marginBottom: '10px' }}><strong>Код на резервацията:</strong> UP8DTB</p>
          <p style={{ marginBottom: '10px' }}><strong>Обща продължителност на пътуването:</strong> 9 дни</p>
          <p style={{ marginTop: '20px', fontStyle: 'italic' }}>"Най-добрите семейни спомени се правят заедно" 👨‍👩‍👧‍👦</p>
        </div>
      </div>
    </div>
  );
};

export default MaldivesSurprise;
