import React, { useEffect, useState } from 'react'
import { Html5QrcodeScanner } from "html5-qrcode"

const Qrscanner = () => {
    const [ScanResult, setScanResult] = useState(null)

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250
            },
            fps: 5
        })

        scanner.render(success, error)

        function success(result) {
            scanner.clear()
            setScanResult(result)
        }
        function error(err) {
            console.warn(err)
        }
    }, [])
   

    return (<>
        <h1>Qr Scanner</h1>
        {ScanResult ? <div>Found Result: <a href={ScanResult }>{ScanResult}</a></div> : <div id="reader"> </div>}
    </>)
}

export default Qrscanner