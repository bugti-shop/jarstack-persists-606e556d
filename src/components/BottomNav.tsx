import { Home, BarChart3, Wrench, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const triggerHaptic = async () => {
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch (error) {
    // Haptics not available in web environment
  }
};

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border">
      <div className="max-w-screen-xl mx-auto px-2">
        <div className="grid grid-cols-4 gap-1 py-1.5">
          <NavLink
            to="/"
            onClick={triggerHaptic}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-2 transition-all ${
                isActive
                  ? 'text-[#000000] dark:text-white'
                  : 'text-muted-foreground'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Home
                  size={22}
                  className="mb-0.5"
                  strokeWidth={isActive ? 2.5 : 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <span className="text-[10px] font-medium">Home</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/reports"
            onClick={triggerHaptic}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-2 transition-all ${
                isActive
                  ? 'text-[#000000] dark:text-white'
                  : 'text-muted-foreground'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <BarChart3
                  size={22}
                  className="mb-0.5"
                  strokeWidth={isActive ? 2.5 : 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <span className="text-[10px] font-medium">Reports</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/tools"
            onClick={triggerHaptic}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-2 transition-all ${
                isActive
                  ? 'text-[#000000] dark:text-white'
                  : 'text-muted-foreground'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Wrench
                  size={22}
                  className="mb-0.5"
                  strokeWidth={isActive ? 2.5 : 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <span className="text-[10px] font-medium">Tools</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/settings"
            onClick={triggerHaptic}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-2 transition-all ${
                isActive
                  ? 'text-[#000000] dark:text-white'
                  : 'text-muted-foreground'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Settings
                  size={22}
                  className="mb-0.5"
                  strokeWidth={isActive ? 2.5 : 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <span className="text-[10px] font-medium">Settings</span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
