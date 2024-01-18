import { useState, useEffect, KeyboardEvent } from 'react';
import './App.css'

interface CardProps {
  title: string;
  content: string;
}

const cardData: CardProps[] = [
  {
    title: "What is Frontend Mentor, and how will it help me?",
    content: "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building."
  },
  {
    title: "Is Frontend Mentor free?",
    content: 'Yes, Frontend Mentor offers both free and premium coding challenges, with the free option providing access to a range of projects suitable for all skill levels.'
  },
  {
    title: "Can I use Frontend Mentor projects in my portfolio?",
    content: "Yes, you can use projects completed on Frontend Mentor in your portfolio. It's an excellent way to showcase your skills to potential employers!"
  },
  {
    title: "How can I get help if I'm stuck on a challenge?",
    content: "The best place to get help is inside Frontend Mentor's Discord community. There's a help channel where you can ask questions and seek support from other community members."
  }
];

const CardItem = ({ title, content }: CardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  }
  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    (event.key === 'Enter' || event.key === ' ') ? setIsOpen(!isOpen) : null;
  };

  useEffect(() => {
    const handleKeyDownEvent: EventListener = (event) => {
      const keyboardEvent = event as unknown as KeyboardEvent; // how to fix it?

      if (keyboardEvent.key === 'ArrowUp' || keyboardEvent.key === 'ArrowDown') {
        event.preventDefault();
        const cardItems = document.querySelectorAll<HTMLDivElement>('.card-item');
        const currentIndex = Array.from(cardItems).findIndex((item) => item === event.target);
        const nextIndex = keyboardEvent.key === 'ArrowUp' ? currentIndex - 1 : currentIndex + 1;
        if (nextIndex >= 0 && nextIndex < cardItems.length) {
          cardItems[nextIndex].focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDownEvent);
    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, []);

  return (
    <div className='card-item' tabIndex={0} onKeyDown={handleKeyPress}>
      <button className='card-item-header' onClick={toggleCard}>
        <h3>{title}</h3>
        <img src={isOpen ? '../assets/images/icon-minus.svg' : '../assets/images/icon-plus.svg'} alt='button' />
      </button>
      <p className={`card-item-content ${isOpen ? 'show' : 'hide'}`}>{content}</p>
    </div>
  )
}

const App = () => {
  return (
    <>
      <div className='card'>
        <div className="card-title">
          <img src="./assets/images/icon-star.svg" alt="star" />
          <h1>FAQs</h1>
        </div>

        {cardData.map(({ title, content }) => (
          <CardItem key={title} title={title} content={content} />
        ))}
      </div>

      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
        Coded by <a href="https://github.com/birdbirdmurmur">@BirdBird</a>.
      </div>
    </>
  )
}

export default App