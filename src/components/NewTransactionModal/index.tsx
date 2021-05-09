import Modal from 'react-modal'
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransactionTypeContainer, RadioButton } from './style';

Modal.setAppElement('#root');

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose(): void;
}

export function NewTransactionModal({ onRequestClose, isOpen }: NewTransactionModalProps) {

    const { createTransaction } = useTransactions();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        let value = type === 'deposit' ? Math.abs(amount) : - Math.abs(amount);

        const data = {
            title,
            amount: value,
            category,
            type
        };

        await createTransaction(data);

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');

        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button className="request-modal-close" type="button"
                onClick={onRequestClose}>
                <img src={closeImg} alt="Fechar janela" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Título"
                />
                <input
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                    type="number"
                    placeholder="Valor"
                />

                <TransactionTypeContainer>
                    <RadioButton
                        isActive={type === 'deposit'}
                        colorActive="green"
                        onClick={() => setType('deposit')}
                        type="button"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioButton>
                    <RadioButton
                        isActive={type === 'withdraw'}
                        colorActive="red"
                        onClick={() => setType('withdraw')}
                        type="button"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioButton>
                </TransactionTypeContainer>

                <input
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    placeholder="Categoria"
                />

                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}