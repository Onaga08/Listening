document.addEventListener('DOMContentLoaded', () => {
    let mediaRecorder;
    let audioChunks = [];
  
    const startRecordingButton = document.getElementById('startRecording');
    const stopRecordingButton = document.getElementById('stopRecording');
    const uploadButton = document.getElementById('upload');
    const audioPlayer = document.getElementById('audioPlayer');
  
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
  
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };
  
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
  
          audioPlayer.src = audioUrl;
          audioPlayer.style.display = 'block';
          uploadButton.disabled = false;
        };
  
        startRecordingButton.addEventListener('click', () => {
          audioChunks = [];
          mediaRecorder.start();
          startRecordingButton.disabled = true;
          stopRecordingButton.disabled = false;
        });
  
        stopRecordingButton.addEventListener('click', () => {
          mediaRecorder.stop();
          startRecordingButton.disabled = false;
          stopRecordingButton.disabled = true;
        });
  
        uploadButton.addEventListener('click', async () => {
          const formData = new FormData();
          formData.append('audioFile', new File(audioChunks, 'recorded_audio.wav'));
  
          try {
            const response = await fetch('http://localhost:3000/upload', {
              method: 'POST',
              body: formData
            });
  
            if (response.ok) {
              console.log('File uploaded successfully!');
            } else {
              console.error('File upload failed.');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        });
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  });
  