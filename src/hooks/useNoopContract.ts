import { useEffect, useState } from 'react';
import { Noop } from '../contracts/Noop';
import { useTonClient } from './useTonClient';
import { useTonConnect } from './useTonConnect';
import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, toNano } from '@ton/core';

export function useNoopContract() {
    const client = useTonClient();
    const [owner, setOwner] = useState<string>();
    const { sender } = useTonConnect();

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const noopContract = useAsyncInitialize(async () => {
        if (!client) {
            return;
        }
        const contract = Noop.createFromAddress(Address.parse(
            'EQB7On9o7ykIAPehVEk1HOaNqnVgYwIK3ttMb218viOecRkN'
        ));
        return client.open(contract) as OpenedContract<Noop>;
    }, [client]);

    useEffect(() => {
        async function getOwner() {
            if (!noopContract) {
                return;
            }
            const ownerAddress = await noopContract.getOwner();
            setOwner(ownerAddress.toString());
            await sleep(5000); // poll contract owner
            getOwner();
        }
        getOwner();
    }, [noopContract]);

    return {
        owner,
        address: noopContract?.address.toString(),
        sendRefill: () => noopContract?.sendRefill(sender, toNano('1.0')),
        sendWithdraw: () => noopContract?.sendWithdraw(sender, toNano('0.01')),
    };
}
