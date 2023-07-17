import Globe from './components/Globe';


const App = () => {

  return (
    <>
      <Globe />
    </>
  );
};

export default App;







// import React, { useState } from 'react';
// import Globe from './components/Globe';
// import Popover from './components/Popover';

// const App = () => {
//   const [hoveredLine, setHoveredLine] = useState<any>(null);
//   const [hoveredCity, setHoveredCity] = useState<any>(null);
//   const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

//   const handleCityHover = (city: any) => {
//     const { clientX, clientY } = city.event;
//     setHoveredCity(city);
//     setPopoverPosition({ x: clientX, y: clientY });
//   };

//   return (
//     <>
//       <Globe
//         setHoveredLine={setHoveredLine}
//         handleCityHover={handleCityHover}
//       />
//       {hoveredLine && (
//         <Popover position={popoverPosition}>
//           {/* Render the desired content inside the Popover component */}
//           <div>
//             From: {hoveredLine.object.userData.from}<br/>
//             To: {hoveredLine.object.userData.to}<br/>
//             Order: {hoveredLine.object.userData.order}<br/>
//           </div>
//         </Popover>
//       )}
      // {hoveredCity && (
      //   <Popover position={popoverPosition}>
      //     {/* Render the desired content inside the Popover component */}
      //     <div>
      //       City: {hoveredCity.object.userData.city}<br/>
      //       Country: {hoveredCity.object.userData.country}<br/>
      //     </div>
      //   </Popover>
      // )}

//     </>
//   );
// };

// export default App;




