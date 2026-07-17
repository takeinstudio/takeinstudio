import { useEffect, useRef } from 'react';

export default function NativeBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // We generate a unique ID so multiple instances don't clash on the same ID
    const containerId = "container-d391a3cda8a1d65869a7a2039e9cea7b";

    // Set the ID required by the script
    containerRef.current.id = containerId;

    // The script expects this specific container ID, let's load it if it's not present
    if (!document.getElementById('adsterra-native-banner-script')) {
      const script = document.createElement('script');
      script.id = 'adsterra-native-banner-script';
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = "https://pl30401922.effectivecpmnetwork.com/d391a3cda8a1d65869a7a2039e9cea7b/invoke.js";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="flex justify-center my-4 w-full">
      <div ref={containerRef} />
    </div>
  );
}
