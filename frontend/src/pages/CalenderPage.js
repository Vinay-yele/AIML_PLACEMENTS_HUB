// // frontend/src/pages/CalendarPage.js
// import React from 'react';

// const CalendarPage = () => {
//     // IMPORTANT: Replace the src URL below with your actual Google Calendar embed URL.
//     // To get this:
//     // 1. Go to Google Calendar (calendar.google.com).
//     // 2. On the left sidebar, under "My calendars", hover over your calendar and click the three dots.
//     // 3. Select "Settings and sharing".
//     // 4. Scroll down to the "Integrate calendar" section.
//     // 5. Copy the 'src' value from the iframe code provided.
//     const googleCalendarEmbedUrl = "https://calendar.google.com/calendar/embed?src=en.indian%23holiday%40group.v.calendar.google.com&ctz=Asia%2FKolkata"; // Example: Indian Holidays

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Upcoming Events & Deadlines</h2>

//             <div className="bg-white rounded-lg shadow-md p-4 overflow-hidden" style={{ height: '700px' }}>
//                 {/* Responsive iframe for Google Calendar */}
//                 <iframe
//                     src={googleCalendarEmbedUrl}
//                     style={{ border: 0 }}
//                     width="100%"
//                     height="100%"
//                     frameBorder="0"
//                     scrolling="no"
//                     title="Google Calendar"
//                 ></iframe>
//             </div>

//             <p className="text-center text-gray-600 mt-6">
//                 * You can sync this calendar with your personal Google Calendar by clicking the "+Google Calendar" button within the embedded calendar, if available.
//             </p>
//         </div>
//     );
// };

// export default CalendarPage;
