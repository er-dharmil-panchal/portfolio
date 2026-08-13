import { marqueeItems } from '../data/portfolioData';

export default function MarqueeStrip() {
  const allItems = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {allItems.map((item, index) => (
          <span key={index} className="marquee-item">
            {item === '◈' ? (
              <span className="marquee-star">◈</span>
            ) : (
              <>
                <span className="marquee-dot" />
                {item}
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
