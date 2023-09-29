// Sample data for the user's posts (to be replaced with actual data from the server)
const userPostsData = [];

// Function to display the user's posts
function displayUserPosts() {
    const userPostsElement = document.getElementById('userPosts');
    userPostsElement.innerHTML = '';

    userPostsData.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>Prompt:</h3>
            <p>${post.prompt}</p>
            <h3>Output:</h3>
            <p>${post.output}</p>
        `;

        // Display image or video if available
        if (post.mediaType === 'image') {
            const imageElement = document.createElement('img');
            imageElement.src = post.mediaUrl;
            imageElement.alt = 'Uploaded Image';
            postElement.appendChild(imageElement);
        } else if (post.mediaType === 'video') {
            const videoElement = document.createElement('video');
            videoElement.src = post.mediaUrl;
            videoElement.controls = true;
            videoElement.alt = 'Uploaded Video';
            postElement.appendChild(videoElement);
        }

        userPostsElement.appendChild(postElement);
    });
}

// Handle form submission
document.getElementById('postForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting traditionally

    // Fetch the values entered by the user
    const prompt = document.getElementById('prompt').value;
    const output = document.getElementById('output').value;
    const mediaFile = document.getElementById('uploadFile').files[0];

    // Determine media type (image or video) based on file type
    let mediaType = null;
    if (mediaFile) {
        if (mediaFile.type.startsWith('image')) {
            mediaType = 'image';
        } else if (mediaFile.type.startsWith('video')) {
            mediaType = 'video';
        }
    }

    // Create a new post object
    const newPost = {
        id: userPostsData.length + 1, // Generate a unique ID (replace with a proper ID generation mechanism)
        prompt: prompt,
        output: output,
        mediaType: mediaType,
        mediaUrl: URL.createObjectURL(mediaFile) // Generate a URL for the uploaded media
    };

    // Add the new post to the user's posts
    userPostsData.push(newPost);

    // Display the user's posts
    displayUserPosts();

    // Reset the form fields (clear inputs)
    document.getElementById('prompt').value = '';
    document.getElementById('output').value = '';
    document.getElementById('uploadFile').value = ''; // Clear file input

    // You can then proceed to send the data and files to your backend for storage
});
