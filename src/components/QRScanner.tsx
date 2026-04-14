import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface Props {
  onScanSuccess: (text: string) => void;
}

function QRScanner({ onScanSuccess }: Props) {

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250
      },
      false
    );

    scanner.render(
      (decodedText) => {
        console.log("QR Code:", decodedText);
        onScanSuccess(decodedText);
      },
      () => {}
    );

  }, []);

  return (
    <div
      id="reader"
      style={{
        width: "100%",
        maxWidth: "500px",
        margin: "auto"
      }}
    />
  );
}

export default QRScanner;