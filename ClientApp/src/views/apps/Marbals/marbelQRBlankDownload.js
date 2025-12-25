// ** Custom Components
import { Fragment} from 'react'
import MarbelQRMultipleDownload from './marbelQRMultipleDownload'

const MarbelQRBlankDownload = () => {
    const selectedProducts = JSON.parse(sessionStorage.getItem('SelectedProducts'))
    console.log(selectedProducts.length)
    
    return (<>
        <div className="d-flex flex-wrap">
        {selectedProducts.length > 0 && selectedProducts.map((data, index) => (
            <Fragment key={index}>

                    <MarbelQRMultipleDownload qrId={data} />
                </Fragment>
        ))}
        </div>
         </>
        
    )
}

export default MarbelQRBlankDownload
