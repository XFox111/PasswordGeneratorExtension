import React, { createContext, useContext, useEffect, useState } from "react";
import ExtensionOptions from "./ExtensionOptions";
import GeneratorOptions from "./GeneratorOptions";

const defaultOptions: IStorage =
{
	generatorOptions: new GeneratorOptions(),
	extOptions: new ExtensionOptions(),
	updateStorage: async () => { }
};

const Storage = createContext<IStorage>(defaultOptions);

export const useStorage = () => useContext<IStorage>(Storage);

export const StorageProvider: React.FC<IStorageProviderProps> = (props) =>
{
	const [storage, setStorage] = useState<IStorage | null>(null);

	const getStorage = async () =>
		setStorage({
			extOptions: await browser.storage.sync.get(defaultOptions.extOptions) as ExtensionOptions,
			generatorOptions: await browser.storage.sync.get(defaultOptions.generatorOptions) as GeneratorOptions,
			updateStorage: async (options) => await browser.storage.sync.set(options)
		});

	useEffect(() =>
	{
		getStorage();
		browser.storage.sync.onChanged.addListener(getStorage);
		return () => browser.storage.sync.onChanged.removeListener(getStorage);
	}, []);

	return (
		<Storage.Provider value={ storage ?? defaultOptions }>
			{ storage ? props.children : props.loader }
		</Storage.Provider>
	);
};

// #region Types
interface IStorage
{
	generatorOptions: GeneratorOptions;
	extOptions: ExtensionOptions;
	updateStorage: (options: Partial<GeneratorOptions | ExtensionOptions>) => Promise<void>;
}

interface IStorageProviderProps extends React.PropsWithChildren
{
	loader?: JSX.Element;
}
// #endregion
