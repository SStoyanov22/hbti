import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const MaldivesSurprise = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  // Resort images from pics folder
  const resortImages = [
    '/pics/364904860.jpg',
    '/pics/367051522.jpg',
    '/pics/364904908.jpg',
    '/pics/327158367.jpg',
    '/pics/327199365.jpg',
    '/pics/367051524.jpg',
    '/pics/364904892.jpg',
    '/pics/364904914.jpg',
    '/pics/ocean-202074_1920.jpg',
    '/pics/fish-2733323_1920.jpg',
    '/pics/maldives-2299563_1920.jpg',
    '/pics/the-sea-3198131_1920.jpg',
    '/pics/maldive-islands-2171627_1920.jpg',
    '/pics/sea-2379496_1920.jpg'
  ];

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
        <div style={{ padding: '40px 30px' }}>

          {/* Photo Gallery Carousel Section */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              color: '#2c3e50',
              fontSize: '1.8em',
              marginBottom: '20px',
              borderBottom: '3px solid #4facfe',
              paddingBottom: '10px'
            }}>
              📸 Виж къде ще отидеш
            </h2>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <button
                onClick={() => setShowGallery(!showGallery)}
                style={{
                  background: '#4facfe',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  fontSize: '1.1em',
                  cursor: 'pointer',
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
                {showGallery ? '🔼 Скрий снимките' : '🔽 Покажи снимките'}
              </button>
            </div>

            {showGallery && (
              <div style={{ marginBottom: '20px' }}>
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
                          alt={`Resort view ${index + 1}`}
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
            )}
          </div>

          {/* Flight Details */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              color: '#2c3e50',
              fontSize: '1.8em',
              marginBottom: '20px',
              borderBottom: '3px solid #4facfe',
              paddingBottom: '10px'
            }}>
              ✈️ Детайли за полетите
            </h2>

            <div style={{
              background: '#f8f9fa',
              padding: '25px',
              borderRadius: '15px',
              borderLeft: '5px solid #4facfe'
            }}>
              {/* Outbound Flight */}
              <div style={{
                marginBottom: '25px',
                padding: '20px',
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <span style={{ fontWeight: 600, color: '#2c3e50', fontSize: '1.1em' }}>
                    Полет 1 - Отиване
                  </span>
                  <span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>
                    Сряда, 4 март 2026
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  margin: '15px 0'
                }}>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: '1.5em', fontWeight: 700, color: '#2c3e50' }}>SOF</div>
                    <div style={{ fontSize: '0.9em', color: '#7f8c8d' }}>София, България</div>
                  </div>
                  <div style={{ fontSize: '2em', color: '#4facfe', margin: '0 20px' }}>✈️</div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: '1.5em', fontWeight: 700, color: '#2c3e50' }}>MLE</div>
                    <div style={{ fontSize: '0.9em', color: '#7f8c8d' }}>Малдиви</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '15px',
                  paddingTop: '15px',
                  borderTop: '1px solid #ecf0f1'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#2c3e50' }}>16:00</div>
                    <div style={{ fontSize: '0.8em', color: '#7f8c8d', textTransform: 'uppercase' }}>Тръгване</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#2c3e50' }}>12:35+1</div>
                    <div style={{ fontSize: '0.8em', color: '#7f8c8d', textTransform: 'uppercase' }}>Пристигане</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#2c3e50' }}>17ч 35м</div>
                    <div style={{ fontSize: '0.8em', color: '#7f8c8d', textTransform: 'uppercase' }}>Продължителност</div>
                  </div>
                </div>
              </div>

              {/* Return Flight */}
              <div style={{
                padding: '20px',
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <span style={{ fontWeight: 600, color: '#2c3e50', fontSize: '1.1em' }}>
                    Полет 2 - Завръщане
                  </span>
                  <span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>
                    Четвъртък, 12 март 2026
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  margin: '15px 0'
                }}>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: '1.5em', fontWeight: 700, color: '#2c3e50' }}>MLE</div>
                    <div style={{ fontSize: '0.9em', color: '#7f8c8d' }}>Малдиви</div>
                  </div>
                  <div style={{ fontSize: '2em', color: '#4facfe', margin: '0 20px' }}>✈️</div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: '1.5em', fontWeight: 700, color: '#2c3e50' }}>SOF</div>
                    <div style={{ fontSize: '0.9em', color: '#7f8c8d' }}>София, България</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '15px',
                  paddingTop: '15px',
                  borderTop: '1px solid #ecf0f1'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#2c3e50' }}>21:55</div>
                    <div style={{ fontSize: '0.8em', color: '#7f8c8d', textTransform: 'uppercase' }}>Тръгване</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#2c3e50' }}>09:15+1</div>
                    <div style={{ fontSize: '0.8em', color: '#7f8c8d', textTransform: 'uppercase' }}>Пристигане</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#2c3e50' }}>14ч 20м</div>
                    <div style={{ fontSize: '0.8em', color: '#7f8c8d', textTransform: 'uppercase' }}>Продължителност</div>
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
              "Скъпа Ивета,<br/><br/>
              Това пътуване до Малдивите е твоя мечта, която ще се сбъдне за твоя 30-и рожден ден!
              Няма по-добър начин да отпразнуваме този важен юбилей от едно невероятно приключение в рая заедно с цялото семейство.<br/><br/>
              Ще вървим по красивите плажове, ще се наслаждаваме на кристално чистите води и ще създаваме
              незабравими спомени, които ще траят цял живот. Нямаме търпение да видим
              невероятния морски живот и да се забавляваме в този магически курорт заедно!<br/><br/>
              Това е твоят ден, твоята мечта, твоето приключение! Нека направим твоя 30-и рожден ден
              най-незабравимия ден в живота ти!<br/><br/>
              С любов,<br/>
              Стоян, мама, тати и вуйчо 👨‍👩‍👧‍👦🎂"
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
