import React from "react";

class UserCard extends React.Component {
    constructor(props) {
        super(props);
        console.log("Child - constrcutor" + " " + this.props.name);

        this.state = {
            count: 0

        }

    }

    ComponentDidMount() {
        console.log("Child - ComponentDidMount" + " " + this.props.name);
    }

    render() {
        const { name, location } = this.props
        console.log("Child - render" + " " + this.props.name);

        return (
            <div className="max-w-sm p-6 m-4 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-3">
                {/* User Name */}
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                    {name}
                </h1>

                {/* Location */}
                <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <svg
                        className="w-4 h-4 text-orange-500 inline-block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {location}
                </p>

                {/* Counter & Action Button Row */}
                <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">Count</span>
                        <h4 className="px-2.5 py-0.5 text-sm font-bold bg-orange-50 text-orange-600 rounded-full border border-orange-100">
                            {this.state.count}
                        </h4>
                    </div>

                    <button
                        className="inline-flex items-center justify-center w-9 h-9 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold rounded-lg shadow-sm shadow-orange-500/20 transition-all duration-150 cursor-pointer"
                        onClick={() => {
                            this.setState({
                                count: this.state.count + 1,
                            });
                        }}
                    >
                        +
                    </button>
                </div>
            </div>


        )
    }
}

export default UserCard;