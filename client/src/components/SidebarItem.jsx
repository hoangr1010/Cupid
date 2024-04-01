// This React component is an item on our nav sidebar

// text: String = the text content of our item
// href: String = the url that we want our item to points to
// notificationCount: Int = the number we wants to show in the notification badge next to our item
// children: HTML = the HTML code (gotten from Flowbite's website) to render the icon to the left of our item
const SidebarItem = ({ text, href="#", notificationCount=0, children }) => {
  return (
    <li>
      <a href={href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        {children}
        <span className="ms-3">{text}</span>

        {notificationCount > 0 && <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{notificationCount}</span>}
      </a>
    </li>
  );
}

export default SidebarItem;