const Workspaces = () => {
    const workspaces = [
        { title: "Web Science", day: "Tuesday/Friday", time: "8:00-9:50am", location: "Lally 102", color: "--orange", to:"/home/dashboard" },
        { title: "Intro to Biology", day: "Tuesday/Friday", time: "10:00-11:50am", location: "Sage 2510", color: "--yellow",to:"/home/dashboard" },
        { title: "Data Structures", day: "Monday/Thursday", time: "2:00-3:50pm", location: "DCC 337", color: "--blue", to:"/home/dashboard" }
    ];

    return (
        <div>
            <h2>Your Workspaces</h2>
            <div className="workspaces">
                {workspaces.map((workspace, index) => (
                    <Card key={index} {...workspace} />
                ))}
            </div>
        </div>
        
    );
};
