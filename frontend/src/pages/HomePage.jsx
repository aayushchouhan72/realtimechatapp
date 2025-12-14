import React from "react";
import { useChatStore } from "../store/useChatStore";

// ⚠️ IMPORTANT: Folder & file names MUST match exactly (Linux case-sensitive)
import Sidebar from "../Components/Sidebar";
import NoChatSelected from "../Components/NoChatSelected";
import ChatContainer from "../Components/ChatContainer";

function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex flex-col sm:flex-row h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

// import React from "react";
// import { useChatStore } from "../store/useChatStore";
// import Sidebar from "../Components/Sidebar";
// import NoChatSelected from "../Components/NoChatSelected";
// import ChatContainer from "../Components/ChatContainer";
// function HomePage() {
//   const { selectedUser } = useChatStore();

//   return (
//     <div className="h-screen bg-base-200">
//       <div className="flex items-center justify-center pt-20 px-4">
//         <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
//           <div className="flex flex-col sm:flex-row h-full rounded-lg overflow-hidden">
//             <Sidebar />

//             {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;
