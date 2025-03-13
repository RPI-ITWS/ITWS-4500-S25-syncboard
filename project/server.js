const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const path = require('path');
const { connectToDb, getDb } = require('./db.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());



connectToDb((err) => {
    if (!err){
        db = getDb();
        console.log("Successful database connection!")
    }
    else {
        console.log(err);
    }
})

const groupsData = path.join(__dirname, 'public', 'groups.json');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// helper function to read data from JSON file
function readData() {
    if (!fs.existsSync(groupsData)) {
        return { groups: [], nextId: 0 };
    } else {
        let rawData = fs.readFileSync(groupsData);
        return JSON.parse(rawData);
    }
}

// helper function to write data back to JSON file
function writeData(data) {
    let jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(groupsData, jsonData);
}

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
 });

// create a new group
app.post('/groups', (req, res) => {
    let data = readData();
    let newGroup = {
        id: data.nextId.toString(),
        name: req.body.name,
        description: req.body.description,
        visibility: req.body.visibility,
        tags: req.body.tags,
        creator: req.body.creator,
        members: [req.body.creator]
    };
    data.groups.push(newGroup);
    data.nextId = data.nextId + 1;
    writeData(data);
    res.status(201).json(newGroup);
});

// get specific group details
app.get('/groups/:groupID', (req, res) => {
    let data = readData();
    let found = false;
    for (let i = 0; i < data.groups.length; i++) {
        if (data.groups[i].id === req.params.groupID) {
            res.json(data.groups[i]);
            found = true;
            break;
        }
    }
    if (!found) {
        res.status(404).json({ error: 'Group not found' });
    }
});

// update specific group details
app.put('/groups/:groupID', (req, res) => {
    let data = readData();
    let found = false;
    for (let i = 0; i < data.groups.length; i++) {
        if (data.groups[i].id === req.params.groupID) {
            data.groups[i].name = req.body.name;
            data.groups[i].description = req.body.description;
            data.groups[i].visibility = req.body.visibility;
            data.groups[i].tags = req.body.tags;
            found = true;
            break;
        }
    }
    if (found) {
        writeData(data);
        res.json({ message: 'Group updated' });
    } else {
        res.status(404).json({ error: 'Group not found' });
    }
});

// delete a specific group
app.delete('/groups/:groupID', (req, res) => {
    let data = readData();
    let newGroups = [];
    let deleted = false;
    for (let i = 0; i < data.groups.length; i++) {
        if (data.groups[i].id !== req.params.groupID) {
            newGroups.push(data.groups[i]);
        } else {
            deleted = true;
        }
    }
    data.groups = newGroups;
    writeData(data);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Group not found' });
    }
});

// list all groups
app.get('/groups', (req, res) => {
    let data = readData();
    let publicGroups = [];
    for (let i = 0; i < data.groups.length; i++) {
        console.log(data.groups.length);
        if (data.groups[i].visibility === 'public') {
            publicGroups.push(data.groups[i]);
        }
    }
    res.json(publicGroups);
});

// list all group members from specific group
app.get('/groups/:groupID/members', (req, res) => {
    let data = readData();
    let group = null;
    for (let i = 0; i < data.groups.length; i++) {
        if (data.groups[i].id === req.params.groupID) {
            group = data.groups[i];
            break;
        }
    }
    if (group) {
        res.json(group.members);
    } else {
        res.status(404).json({ error: 'Group not found' });
    }
});

// remove a member from specific group
app.delete('/groups/:groupID/members/:userID', (req, res) => {
    let data = readData();
    let found = false;
    for (let i = 0; i < data.groups.length; i++) {
        if (data.groups[i].id === req.params.groupID) {
            let newMembers = [];
            for (let j = 0; j < data.groups[i].members.length; j++) {
                if (data.groups[i].members[j] !== req.params.userID) {
                    newMembers.push(data.groups[i].members[j]);
                } else {
                    found = true;
                }
            }
            data.groups[i].members = newMembers;
            break;
        }
    }
    if (found) {
        writeData(data);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Group or member not found' });
    }
});

// search all groups
app.get('/groups/search', (req, res) => {
    let data = readData();
    let results = [];
    for (let i = 0; i < data.groups.length; i++) {
        if (data.groups[i].name.toLowerCase().includes(req.query.q.toLowerCase())) {
            results.push(data.groups[i]);
        } else {
            for (let j = 0; j < data.groups[i].tags.length; j++) {
                if (data.groups[i].tags[j].toLowerCase().includes(req.query.q.toLowerCase())) {
                    results.push(data.groups[i]);
                    break;
                }
            }
        }
    }
    res.json(results);
});

// **profile endpoints**

app.get('/profile', (req, res) => {
    
    let profiles = [];
    db.collection('profiles')
        .find()
        .forEach(pf => profiles.push(pf))
        .then(() => {
            res.status(200).json(profiles);
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

app.get('/profile/:name', (req, res) => {
    const profileName = req.params.name;

    db.collection('profiles')
        .findOne({name: profileName})
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

app.put('/profile/:name', (req, res) => {
    const updatedProfile = req.body;
    delete updatedProfile._id; 
    const profileName = req.params.name;

    db.collection('profiles')
        .updateOne({name: profileName}, {$set: updatedProfile})
        .then(result => {
            if (result.modifiedCount === 0) {
                return res.status(404).json({ error: 'Profile not found!' });
            }
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'Could not update your profile!'});
        })
});

// *login endpoints*

app.post('/login', (req, res) => {
    const loginProfile = req.body;

    db.collection('profiles')
        .findOne({ email: loginProfile['email'], password: loginProfile['password'] }) 
        .then(profile => {
            if (!profile) {
                return res.status(401).json({ error: 'Invalid name or password!' });
            }
            req.session.user = {
                id: profile._id,
                email: profile.email,
                name: profile.name
            };
            req.session.save();
            res.status(200).json(profile);
        })
        .catch(err => {
            console.error('Database query error:', err);
            res.status(500).json({ error: 'Internal server error' });
        });

})

app.post('/signup', (req, res) => {
    const newProfile = req.body;

    db.collection('profiles')
        .insertOne(newProfile) 
        .then(profile => {
            if (!profile) {
                return res.status(401).json({ error: 'Invalid profile!' });
            }
            res.status(200).json(profile);
        })
        .catch(err => {
            console.error('Database query error:', err);
            res.status(500).json({ error: 'Internal server error' });
        });

})

app.get('/user', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not logged in' });
    }
    res.json(req.session.user);
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ message: "Logged out successfully" });
    });
});

app.listen(PORT, function() {
    console.log('Server running on port ' + PORT);
});