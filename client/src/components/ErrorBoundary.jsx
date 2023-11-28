import { Component } from "react";
import SomethingWrong from "./something-wrong/SomethingWrong";

export default class ErrorBoundary extends Component{
    constructor(){
        super();
        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(err){
        return {
            hasError: true,
        } 
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <SomethingWrong />
        }

        return this.props.children;
    }
}