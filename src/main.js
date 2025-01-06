import {
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D
} from '@snap/camera-kit'

//
(async function(){
    const cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzM2MTY3ODExLCJzdWIiOiI2MmMzMjUwYi1lYjc0LTRhNjAtYTY4OC0yOGJjY2Q3MzdmMGV-U1RBR0lOR34wOTNlNWRiMS04OTY4LTQ3ZTgtOWMyNy05M2VkYzgwZDc3YTIifQ.ttEELx9SWh3S5sarF3l65NpP5jTLsXybSN8cw51ptYI'})
    const session = await cameraKit.createSession()
    
    document.getElementById('canvas').replaceWith(session.output.live)

    const {lenses} = await cameraKit.lensRepository.loadLensGroups(['a54f0359-78e4-4aa0-ba73-950434271da7'])

    session.applyLens(lenses[0])
    let mediaStream = await navigator.mediaDevices.getUserMedia(
        {
            video : {facingMode: 'environment'}
        }
    )

    const source = createMediaStreamSource(
        mediaStream, {
            //transform: Transform2D.MirrorX,
            cameraType: 'back'
        }
    )

    await session.setSource(source)

    session.source.setRenderSize(window.innerWidth, window.innerHeight)

    session.play()
})();