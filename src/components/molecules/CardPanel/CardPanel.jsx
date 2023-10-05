import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRepoData } from '@context/repo-data'
import { formatRank } from '@utils/formatters/card-formatter'
import '@types/typedef'
import { useScrollLock } from '@hooks/useScrollLock'

const CardPanel = ({ selectedId }) => {
    // Lock Body Scroll on mount.
    useScrollLock()

    const { repos, setSelectedId } = useRepoData()
    const [ currentRepo, setCurrentRepo ] = useState(null)

    const resetSelectedId = () => setSelectedId(null)

    useEffect(() => {
        if (selectedId) {
            const _currentRepo = repos.find(repo => repo.id === selectedId)
            setCurrentRepo(_currentRepo)
        }
    }, [selectedId])

    /** @type {RepositoryData} */
    const { name, description, owner, stars, avatar, index, commits } = currentRepo || {}

    const ranking = formatRank(index)

    /** @type {AnimationProps.variants} */
    const motionVariants = {
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: 'anticipate',
            }
        },
        hide: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.5,
                ease: 'anticipate',
            }
        }
    }

    return (
        <motion.div
            className='screen'
            variants={motionVariants}
            initial='hide'
            animate='show'
            exit='hide'
            onClick={resetSelectedId}
        >
            <motion.article
                className="card-panel"
                whileInView='show'
            >
                <div className="card-panel__header">
                    <div className="card-panel__eyebrow">
                        <div className="card-panel__eyebrow-icon material-symbols-rounded">star</div>
                        <div className="card-panel__eyebrow-text">{ stars?.toLocaleString() }</div>
                    </div>
                    <div className="card-panel__avatar">
                        <img className="lazyload" src={ avatar } alt={ owner } />
                    </div>
                </div>
                <div className="card-panel__body">
                    <div className="card-panel__author">
                        { owner }
                    </div>
                    <h2 className="card-panel__title">
                        { name }
                    </h2>
                    <div className="card-panel__description">{ description }</div>
                        <div className="card-panel__commits">
                            <h3 className="card-panel__commits-title">Recent Commits</h3>
                            <ul className="card-panel__commits-list">
                                {commits?.length &&
                                    commits.map(commit => (
                                        <li className="card-panel__commits-item" key={commit.sha}>
                                            <div className="card-panel__commits-sha">{commit.shortSha}</div>
                                            <div className="card-panel__commits-item-author">{commit.author}</div>
                                            <div className="card-panel__commits-item-message">{commit.message}</div>
                                            <div className="card-panel__commits-item-date">{commit.hours}</div>
                                            <a className="card-panel__commits-link" href={commit.url} target='_blank'>Link</a>
                                        </li>
                                    ))
                                }
                                {commits?.length === 0 && (
                                    <li className="card-panel__commits-item">
                                        <div className="card-panel__commits-item-message">No recent commits.</div>
                                    </li>
                                )}
                                {!commits && (
                                    <li className="card-panel__commits-item">
                                        <div className="card-panel__commits-item-message">Loading...</div>
                                    </li>
                                )}
                            </ul>
                        </div>
                </div>

                <div className="card-panel__footer">
                    <div className="card-panel__ranking">
                        { ranking }
                    </div>
                    <button
                        className="card-panel__button button button--outline"
                        title="Close Repo Details"
                        onClick={resetSelectedId}
                    >
                        <span className="sr-only">Close Repo Details</span>
                        <span className="card-panel__button-icon material-symbols-rounded">close</span>
                    </button>
                </div>
            </motion.article>
        </motion.div>
    )
}

export default CardPanel