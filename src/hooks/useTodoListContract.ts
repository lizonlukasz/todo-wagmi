import { useState, useEffect } from 'react';
import {
  useAccount, useContractRead,
  useContractWrite, useNetwork, useWaitForTransaction,
} from 'wagmi';
import { todoListContractAbi as abi } from 'abis';
import { getTodoContractAddress } from 'config/todoContract';

export const useTodoListContract = () => {
  const [error, setError] = useState<Error | null>(null);
  const { chain } = useNetwork();
  const { address } = useAccount();
  const contractAddress = getTodoContractAddress(chain);

  const {
    data: taskList,
    refetch: refetchTaskList,
    isLoading: taskListLoading,
    isSuccess: taskListSuccess,
  } = useContractRead({
    address: contractAddress,
    abi,
    functionName: 'getTodoList',
    args: [address!],
  });

  const {
    data: createTaskData,
    write: writeCreateTask,
  } = useContractWrite({
    address: contractAddress,
    abi,
    functionName: 'addTask',
    onError: setError,
  });

  const addTask = (text: string) => {
    writeCreateTask({ args: [text] });
  };

  const { isSuccess: createTaskSuccess } = useWaitForTransaction({
    hash: createTaskData?.hash,
  });

  const {
    data: completeTaskData,
    write: writeToggleCompleted,
  } = useContractWrite({
    address: contractAddress,
    abi,
    functionName: 'markTaskCompleted',
    onError: setError,
  });

  const completeTask = (taskId: bigint) => {
    writeToggleCompleted({ args: [taskId] });
  };

  const { isSuccess: completeTaskSuccess, isLoading: completeTaskLoading } = useWaitForTransaction({
    hash: completeTaskData?.hash,
  });

  useEffect(() => {
    refetchTaskList();
  }, [createTaskSuccess, completeTaskSuccess, chain, address]);

  return {
    taskList: taskList ?? [],
    taskListLoading,
    taskListSuccess,
    addTask,
    completeTask,
    completeTaskLoading,
    error,
  };
};
