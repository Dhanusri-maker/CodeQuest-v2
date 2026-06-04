import React, { useEffect, useState } from 'react';

import axios from 'axios';

const Leaderboard = () => {

    const [scores, setScores] = useState([]);

    useEffect(() => {

        axios
            .get('http://localhost:5001/api/leaderboard')

            .then((res) => {

                console.log(res.data);

                setScores(res.data);

            })

            .catch((err) => {

                console.log(err);

            });

    }, []);

    return (

        <div

            style={{

                backgroundColor: '#0a0a1a',

                minHeight: '100vh',

                color: 'white',

                padding: '20px'

            }}

        >

            <h1

                style={{

                    textAlign: 'center',

                    color: '#00d4ff'

                }}

            >

                🏆 Leaderboard

            </h1>

            <table

                style={{

                    width: '100%',

                    borderCollapse: 'collapse',

                    marginTop: '20px'

                }}

            >

                <thead>

                    <tr

                        style={{

                            backgroundColor: '#111'

                        }}

                    >

                        <th style={styles.th}>Rank</th>

                        <th style={styles.th}>Username</th>

                        <th style={styles.th}>Score</th>

                        <th style={styles.th}>Category</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        scores.map((user, index) => (

                            <tr

                                key={index}

                                style={{

                                    textAlign: 'center',

                                    backgroundColor:

                                        index % 2 === 0

                                            ? '#1a1a2e'

                                            : '#16213e'

                                }}

                            >

                                <td style={styles.td}>

                                    #{index + 1}

                                </td>

                                <td style={styles.td}>

                                    {user.username}

                                </td>

                                <td style={styles.td}>

                                    {user.score}

                                </td>

                                <td style={styles.td}>

                                    {user.category}

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

const styles = {

    th: {

        border: '1px solid cyan',

        padding: '12px',

        color: '#00d4ff'

    },

    td: {

        border: '1px solid cyan',

        padding: '10px'

    }

};

export default Leaderboard;