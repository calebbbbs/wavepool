import React from 'react';
import { useQuery} from '@apollo/client';
import TEST_QUERY from '../graphQL/query/testQ';
function Test() {
    const { loading, error, data } = useQuery(TEST_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    return (<div>{JSON.stringify(data.hello)}</div>)};

export default Test;