import { useEffect, useRef } from 'react';

interface AdBannerProps {
  id: string;
  width: number;
  height: number;
  format?: string;
}

export default function AdBanner({ id, width, height, format = 'iframe' }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Clean up previous scripts if re-rendering
    adRef.current.innerHTML = '';

    const conf = document.createElement('script');
    const confCode = `
      atOptions = {
        'key': '${id}',
        'format': '${format}',
        'height': ${height},
        'width': ${width},
        'params': {}
      };
    `;
    conf.type = 'text/javascript';
    conf.text = confCode;
    adRef.current.appendChild(conf);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.highperformanceformat.com/${id}/invoke.js`;
    adRef.current.appendChild(script);

  }, [id, width, height, format]);

  return (
    <div className="flex justify-center my-4 overflow-hidden w-full">
      <div ref={adRef} style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }} />
    </div>
  );
}
