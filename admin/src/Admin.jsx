const Admin = ({ setIsAuthenticated }) => {
    const [posts, setPosts] = React.useState([]);
    const [title, setTitle] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [preview, setPreview] = React.useState(null);
    const [editingId, setEditingId] = React.useState(null);

    React.useEffect(() => {
        // Load posts from localStorage or JSON
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
            setPosts(JSON.parse(storedPosts));
        } else {
            fetch('/data/posts.json')
                .then(res => res.json())
                .then(data => {
                    setPosts(data);
                    localStorage.setItem('posts', JSON.stringify(data));
                });
        }
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { id: editingId || Date.now(), title, price, image };
        let updatedPosts;
        if (editingId) {
            updatedPosts = posts.map(post =>
                post.id === editingId ? newPost : post
            );
        } else {
            updatedPosts = [...posts, newPost];
        }
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        // Reset form
        setTitle('');
        setPrice('');
        setImage(null);
        setPreview(null);
        setEditingId(null);
    };

    const handleEdit = (post) => {
        setTitle(post.title);
        setPrice(post.price);
        setImage(post.image);
        setPreview(post.image);
        setEditingId(post.id);
    };

    const handleDelete = (id) => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
                    Logout
                </button>
            </div>

            {/* Post Creation Form */}
            <div className="bg-white p-6 rounded shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Product Title"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price (₹)"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full p-2 mb-4"
                    />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                        {editingId ? 'Update' : 'Publish'}
                    </button>
                </form>
                {preview && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Preview</h3>
                        <div className="bg-gray-100 p-4 rounded">
                            <img src={preview} alt="Preview" className="w-32 h-32 object-cover mb-2" />
                            <h4 className="text-lg">{title}</h4>
                            <p>₹{price}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Post List */}
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {posts.map(post => (
                        <div key={post.id} className="border p-4 rounded flex justify-between items-center">
                            <div>
                                <img src={post.image} alt={post.title} className="w-16 h-16 object-cover mr-4" />
                                <h3 className="text-lg">{post.title}</h3>
                                <p>₹{post.price}</p>
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => handleEdit(post)} className="bg-blue-600 text-white px-2 py-1 rounded">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(post.id)} className="bg-red-600 text-white px-2 py-1 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
