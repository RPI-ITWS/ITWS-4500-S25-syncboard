const Resources = () =>{
    return(
        <div>
            <Homebar/>
            <div className="secondContent">
            <h2>Links & Resources</h2>
                <table>
                    <tr>
                        <th>DESCRIPTION</th>
                        <th>LINK</th>
                    </tr>
                    <tr>
                        <td>Proposal doc</td>
                        <td><a href='https://docs.google.com/document/d/14lj5T4urvm-DmXXQ3PNPD2iNQqRHMIpQgYqWl2cO5kA/edit?usp=sharing'>Proposal Doc Link</a></td>
                    </tr>
                    <tr>
                        <td>Proposal presentation</td>
                        <td><a href='https://docs.google.com/presentation/d/1rEFG244BF1rpLFLtLqrjbvrvOjEnPuvGbYovBSrpOlc/edit#slide=id.p'>Proposal Presentation Link</a></td>
                    </tr>
                    <tr>
                        <td>Team Github</td>
                        <td><a href='https://github.com/RPI-ITWS/ITWS-4500-S25-syncboard'>Team Github Link</a></td>
                    </tr>
                    <tr>
                        <td>Flowbite UI library</td>
                        <td><a href='flowbite.com'>Flowbite Link</a></td>
                    </tr>
                    <tr>
                        <td>Brainstorming doc</td>
                        <td><a href='https://docs.google.com/document/d/15mUxwvXGMxgvsao7BwfkNKuYYnSgkPwR-mrXDVYYguc/edit?usp=sharing'>Brainstorming Doc Link</a></td>
                    </tr>
                    
                </table>

                <br></br>


                <h2>Contact Information</h2>
                <table>
                    <tr>
                        <th>NAME</th>
                        <th>ROLE</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                    </tr>
                    <tr>
                        <td>Mike Peters</td>
                        <td>Member</td>
                        <td>petem@rpi.edu</td>
                        <td>(123)456-7890</td>
                    </tr>
                    <tr>
                        <td>Sasha Brown</td>
                        <td>Member</td>
                        <td>brows@rpi.edu</td>
                        <td>(123)456-7890</td>
                    </tr>
                    <tr>
                        <td>Brian Callahan</td>
                        <td>Professor</td>
                        <td>callab5@rpi.edu</td>
                        <td>(123)456-7890</td>
                    </tr>
                    <tr>
                        <td>Priyanka Mandloi</td>
                        <td>TA</td>
                        <td>mandlp@rpi.edu</td>
                        <td>(123)456-7890</td>
                    </tr>
                    
                </table>
            </div>
        </div>
        
    );
};