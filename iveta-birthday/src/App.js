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
    `${process.env.PUBLIC_URL}/pics/1.jpg`,
    `${process.env.PUBLIC_URL}/pics/2.jpg`,
    `${process.env.PUBLIC_URL}/pics/3.jpg`,
    `${process.env.PUBLIC_URL}/pics/4.jpg`,
    `${process.env.PUBLIC_URL}/pics/5.jpg`,
    `${process.env.PUBLIC_URL}/pics/6.jpg`,
    `${process.env.PUBLIC_URL}/pics/7.jpg`,
    `${process.env.PUBLIC_URL}/pics/8.jpg`,
    `${process.env.PUBLIC_URL}/pics/9.jpg`,
    `${process.env.PUBLIC_URL}/pics/10.jpg`,
    `${process.env.PUBLIC_URL}/pics/11.jpg`,
    `${process.env.PUBLIC_URL}/pics/12.jpg`,
    `${process.env.PUBLIC_URL}/pics/13.jpg`,
    `${process.env.PUBLIC_URL}/pics/14.jpg`,
    `${process.env.PUBLIC_URL}/pics/15.jpg`
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

          {/* Countdown Timer */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: 'clamp(20px, 4vw, 30px)',
            borderRadius: '15px',
            textAlign: 'center',
            marginBottom: 'clamp(20px, 5vw, 40px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{
              fontSize: 'clamp(1.1em, 3.5vw, 1.5em)',
              marginBottom: '20px',
              fontFamily: "'Playfair Display', serif",
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              ⏰ Обратно броене до пътуването
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
              gap: 'clamp(10px, 2vw, 20px)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {[
                { value: timeLeft.days, label: 'Дни' },
                { value: timeLeft.hours, label: 'Часа' },
                { value: timeLeft.minutes, label: 'Минути' },
                { value: timeLeft.seconds, label: 'Секунди' }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '15px',
                    padding: 'clamp(12px, 3vw, 20px)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    fontSize: 'clamp(1.8em, 5vw, 3em)',
                    fontWeight: 'bold',
                    lineHeight: 1,
                    marginBottom: '8px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                  }}>
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div style={{
                    fontSize: 'clamp(0.7em, 2vw, 0.9em)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    opacity: 0.9
                  }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
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
                marginBottom: '20px',
                textAlign: 'justify'
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
              fontSize: 'clamp(1.2em, 4vw, 1.8em)',
              marginBottom: '20px',
              borderBottom: '3px solid #4facfe',
              paddingBottom: '10px',
              textAlign: 'center'
            }}>
              🎂 Честит 30-ти рожден ден, Ивета! 🎂
            </h2>

            <div style={{
              background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
              color: '#2c3e50',
              padding: 'clamp(20px, 4vw, 35px)',
              borderRadius: '15px',
              fontSize: 'clamp(0.95em, 2.5vw, 1.15em)',
              lineHeight: 1.9,
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
            }}>
              <div style={{
                textAlign: 'center',
                fontSize: 'clamp(1.05em, 2.8vw, 1.25em)',
                fontWeight: 600,
                marginBottom: '20px',
                color: '#764ba2'
              }}>
                Скъпа Ивче,
              </div>

              <div style={{ marginBottom: '18px', textAlign: 'justify' }}>
                Тридесет години е специална възраст — време да отпразнуваш всичко, което си постигнала, и да мечтаеш още по-смело за бъдещето! За твоя рожден ден искаме да ти подарим нещо, което винаги си мечтала — пътуване до райските Малдиви!
              </div>

              <div style={{ marginBottom: '18px', textAlign: 'justify' }}>
                Това е твоята награда за силата, с която преодоляваш всяко предизвикателство, за усмивката, с която озаряваш дните ни, и за топлината, която внасяш в живота на всички около теб.
              </div>

              <div style={{ marginBottom: '18px', textAlign: 'justify' }}>
                Заедно като семейство ще се потопим в тюркоазените води, ще се разхождаме по белите пясъци, ще гледаме залези, които спират дъха, и ще създадем спомени, които ще носим завинаги в сърцата си.
              </div>

              <div style={{ marginBottom: '18px', textAlign: 'justify' }}>
                Този 30-ти рожден ден е само началото на най-красивата глава от живота ти. Нека бъде изпълнена със смях, приключения, любов и безкрайно щастие!
              </div>

              <div style={{
                marginTop: '25px',
                paddingTop: '20px',
                borderTop: '2px solid rgba(252, 182, 159, 0.4)',
                textAlign: 'center',
                fontSize: 'clamp(1em, 2.8vw, 1.2em)',
                fontWeight: 600
              }}>
                Обичаме те безкрайно и се гордеем с теб всеки ден!
              </div>

              <div style={{
                textAlign: 'center',
                marginTop: '20px',
                fontSize: 'clamp(0.95em, 2.5vw, 1.1em)'
              }}>
                С цялата си любов,<br/>
                Mама, тати, вуйчо и Стоян 👨‍👩‍👧‍👦💖
              </div>
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
