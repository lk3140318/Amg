const { useState } = React;

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {isAuthenticated ? (
                <Admin setIsAuthenticated={setIsAuthenticated} />
            ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
            )}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
